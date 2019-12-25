const express = require("express");
const router = express.Router();
const { sessionChecker } = require("../middleware/auth");
const Party = require("../models/party");
const User = require("../models/user");

router.get("/", sessionChecker, async function(req, res, next) {
  if (req.session.user) {
  
    let parties = await Party.find({}).populate('host');
 
    res.render("parties", { parties });
  } else {
    res.redirect("/login");
  }
});

router.get("/new", sessionChecker, function(req, res, next) {
  if (req.session.user) {
    res.render("new");
  } else {
    res.redirect("/login");
  }
});

router.post("/new", async function(req, res, next) {
  const newParty = new Party({
    name: req.body.name,
    location: req.body.location,
    createdAt: new Date(),
    startsAt: req.body.startsAt,
    host: req.session.user
  });
  await newParty.save();
  res.redirect(`/parties`);
});


//detail party
router.get("/:id", async function (req, res, next) {
    let party = await Party.findById(req.params.id);
  
    if (req.session.user) {
        res.render("show", { party });
    } else {
        res.redirect("/login");
    }
});


router.get("/:id/host", async function (req, res, next) {
    let user = await (await User.findById(req.params.id))._id;
    let hostparties = await Party.find({ host: user })
   
 
    if (req.session.user) {
        res.render("hostparties", { hostparties });
    } else {
        res.send("залогинься чтобы посмотреть полностью");
    }
});

router.get("/:id/edit", async function (req, res, next) {
    let party = await Party.findById(req.params.id).populate('host');

    if (req.session.user.name===party.host.name) {
        res.render("edit", { party });
    } else {
        res.send(`you cannot edit`);
    }
});
router.put("/:id", async function (req, res, next) {
    let party = await Party.findById(req.params.id);

    party.name = req.body.name;
    party.location = req.body.location;
    party.startsAt = req.body.startsAt;

    await party.save();

    res.redirect(`/parties/${party.id}`);
});

router.delete("/:id", async function (req, res, next) {
    
    await Party.deleteOne({ _id: req.params.id });
    console.log(req.params.id )
    res.redirect("/");
});


// router.delete('/parties/:id', async function (req, res, next) {
//     try {
//         if (req.session.user) {
//             await Party.deleteOne({ '_id': req.params.id });
//             res.end();
//         } else {
//             res.render('error', { message: 'Unauthorized operation' })
//         }
//     } catch (e) {
//         // console.log(e);
//     }
// });


module.exports = router;
