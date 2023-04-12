const express = require("express");
const router = express.Router();
const { Plannings } = require("../models");
const { Users } = require("../models");
const { validateToken } = require("../middlewares/Auth");
const fs = require("fs");
const SibApiV3Sdk = require("sib-api-v3-typescript");
const apiKeyEnv = process.env.SENDINBLUE_API_KEY;


// SENDINBLUE EXAMPLE

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey =
      apiKeyEnv;

// let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

// sendSmtpEmail.subject = "{{params.subject}}";
// sendSmtpEmail.htmlContent =
//       "<html><body><h1>This is my first transactional email {{params.parameter}}</h1><p>TON PERE LE SUCRE TU POUVAIS PAS FAIRE UNE SEULE ET UNIQUE VERSION DE CETTE PUTAIN D'API ?!</body></html>";
// sendSmtpEmail.sender = { name: "Maison Plisson", email: "example@example.com" };
// sendSmtpEmail.to = [{ email: "remsbdj@gmail.com", name: "Jane Doe" }];
// sendSmtpEmail.cc = [{ email: "example2@example2.com", name: "Janice Doe" }];
// sendSmtpEmail.bcc = [{ name: "John Doe", email: "example@example.com" }];
// sendSmtpEmail.replyTo = { email: "replyto@domain.com", name: "John Doe" };
// sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
// sendSmtpEmail.params = {
//       parameter: "",
//       subject: "Un test sendinblue de gros noob",
// };

// apiInstance.sendTransacEmail(sendSmtpEmail).then(
//       function (data) {
//             console.log(
//                   "API called successfully. Returned data: " +
//                         JSON.stringify(data)
//             );
//       },
//       function (error) {
//             console.error(error);
//       }
// );

// SENDINBLUE EXAMPLE

router.get("/", validateToken, async (req, res) => {
      const listOfPlannings = await Plannings.findAll({
            order: [["created_at", "DESC"]],
      });
      res.json({
            listOfPlannings: listOfPlannings,
      });
});

router.post("/", validateToken, async (req, res) => {
      const plannings = req.body.plannings;

      plannings.forEach((planning) => {
            Plannings.create(planning);
      });

      res.json(plannings);
});

router.put("/editplanning", validateToken, async (req, res) => {
      const planning = req.body.planning;
      const user = await Users.findOne({
            where: { complete_name: planning.nom_employe },
      });

      await Plannings.update(
            {
                  id: planning.id,
                  planning_id: planning.planning_id,
                  periode: planning.periode,
                  nom_employe: planning.nom_employe,
                  fonction: planning.fonction,
                  lundi: planning.lundi,
                  mardi: planning.mardi,
                  mercredi: planning.mercredi,
                  jeudi: planning.jeudi,
                  vendredi: planning.vendredi,
                  samedi: planning.samedi,
                  dimanche: planning.dimanche,
                  total_horaires: planning.total_horaires,
            },
            { where: { id: planning.id } }
      );

      if (user) {
            const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

            sendSmtpEmail.subject = "Modification de l'emploi du temps";
            sendSmtpEmail.htmlContent = `<html>
     <head>
       <style type="text/css">
         /* Polices Google Material Design */
         @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
         
         /* Styles Material Design */
         .container {
           font-family: 'Roboto', sans-serif;
           max-width: 600px;
           margin: 0 auto;
           padding: 20px;
           background-color: #fff;
           border-radius: 8px;
           box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
         }
         .title {
           font-size: 28px;
           font-weight: 700;
           margin-bottom: 16px;
         }
         .message {
           font-size: 18px;
           margin-bottom: 32px;
         }
         .logo {
           display: block;
           margin: 0 auto;
           width: 150px;
           height: auto;
           margin-top: 32px;
         }
       </style>
     </head>
     <body>
       <div class="container">
         <h1 class="title">Bonjour ${user.complete_name} !</h1>
         <p class="message">Ton emploi du temps a été modifié ! N'oublie pas d'aller consulter tes nouveaux horaires !</p>
         <img class="logo" src="https://example.com/logo.png" alt="Logo de l'entreprise">
       </div>
     </body>
   </html>`;

            sendSmtpEmail.sender = {
                  name: "Maison Plisson",
                  email: "example@example.com",
            };
            sendSmtpEmail.to = [
                  { email: user.email, name: user.complete_name },
            ];
            sendSmtpEmail.params = {
                  parameter: "",
                  subject: "Modification de l'emploi du temps",
            };

            apiInstance.sendTransacEmail(sendSmtpEmail).then(
                  function (data) {
                        console.log(
                              "API called successfully. Returned data: " +
                                   JSON.stringify(data)
                        );
                  },
                  function (error) {
                        console.error(error);
                  }
            );
      }

      res.json(planning);
      
});



module.exports = router;
