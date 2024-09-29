import "dotenv/config.js";  // for dev
import { 
  express, 
  path,
  ejsMate,
  methodOverride,
  cookieParser,
  session,
  flash,
  bodyParser,
  passport,
  LocalStrategy,
  flashMsg,
  router,
  invalidPathHandler,
  errHandler,
  db,
  User,
  os,
  cluster
} from "./index.js";

const CPU = os.cpus().length;

if(cluster.isPrimary) {
  for(let i = 0; i < CPU; ++i)
    cluster.fork();
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork();
  });
}
else {
  const app = express();
  const port = process.env.PORT ?? 3000;
  const secret = process.env.SESSION_SECRET ?? "myExpressSessionSecret";
  const mongoUrl = process.env.MONGO_URL ?? "mongodb://127.0.0.1:27017/default"
  const sessionOption = {
      secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true,
      },
    };
  
  app.engine("ejs", ejsMate);
  
  app.set("view engine", "ejs");
  app.set("views", path.resolve(import.meta.dirname, "views")); 
  
  app.use(express.static(path.resolve(import.meta.dirname, "public")));   
  
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(methodOverride("_method"));
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.use(session(sessionOption));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.use(new LocalStrategy(User.authenticate()));
  
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser()); 
  
  /**
   * app.get("/demouser", async (req, res) => {
   *   const fakeUser = new User({ 
   *     email: "student@gmail.com",
   *     username: "delta-student"
   *   });
   *   const registeredUser = await User.register(fakeUser, "helloworld");
   *   return res.json({ registeredUser });
   * });
   */
  
  app.use(flash());
  app.use(flashMsg);
  
  app.all(() => console.log("Welcome")); 
  
  app.use("/", router);
  
  db(mongoUrl).then(app.listen(port)).catch(err => next(err)); 
  
  app.use(invalidPathHandler);
  app.use(errHandler);
}
