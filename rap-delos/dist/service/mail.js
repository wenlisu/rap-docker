Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const config_1 = require("../config");
class MailService {
    static send(to, subject, html) {
        nodemailer.createTestAccount((_err, _account) => {
            const transporter = nodemailer.createTransport(config_1.default.mail);
            const mailOptions = {
                from: `"RAP2 Notifier" <${config_1.default.mailSender}>`,
                to,
                subject,
                html,
            };
            transporter.sendMail(mailOptions);
        });
    }
}
exports.default = MailService;
//# sourceMappingURL=mail.js.map