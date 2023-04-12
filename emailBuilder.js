const SibApiV3Sdk = require("sib-api-v3-typescript");

let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications["apiKey"];
apiKey.apiKey =
      "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";

let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

sendSmtpEmail.subject = "{{params.subject}}";
sendSmtpEmail.htmlContent =
      "<html><body><h1>This is my first transactional email {{params.parameter}}</h1><p>TON PERE LE SUCRE TU POUVAIS PAS FAIRE UNE SEULE ET UNIQUE VERSION DE CETTE PUTAIN D'API ?!</body></html>";
sendSmtpEmail.sender = { name: "Maison Plisson", email: "example@example.com" };
sendSmtpEmail.to = [{ email: "remsbdj@gmail.com", name: "Jane Doe" }];
sendSmtpEmail.cc = [{ email: "example2@example2.com", name: "Janice Doe" }];
sendSmtpEmail.bcc = [{ name: "John Doe", email: "example@example.com" }];
sendSmtpEmail.replyTo = { email: "replyto@domain.com", name: "John Doe" };
sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
sendSmtpEmail.params = {
      parameter: "",
      subject: "Un test sendinblue de gros noob",
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
