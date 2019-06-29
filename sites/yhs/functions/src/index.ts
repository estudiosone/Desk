import * as firebase from "firebase-admin";
import * as functions from "firebase-functions";
import * as cors from "cors";
// import * as nodemailer from "nodemailer";
import * as moment from "moment";
import * as aws from "aws-sdk";

const corsHandler = cors({ origin: true });
// import { request } from "https";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

if (!firebase.apps.length) {
  firebase.initializeApp();
}

moment.locale("es");

aws.config.update({
  accessKeyId: functions.config().ses.key,
  secretAccessKey: functions.config().ses.secret,
  region: functions.config().ses.region
});

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

interface BeautySalon {
  id: string;
  name: string;
  schedule: Array<{
    open: string;
    close: string;
  }>;
  shiftBasedOnCalendar: boolean;
  shiftBasedOnSchedule: boolean;
}

interface Service {
  id: string;
  name: string;
}

export const modulesSalonBookingSendReservation = functions.https.onRequest(
  (request, response) => {
    corsHandler(request, response, async () => {
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET, POST");

      try {
        const db = firebase.firestore();
        let reservation: {
          bookingDate: string;
          bookingHour: string;
          bookingSalon: string;
          bookingService: string;
          customerName: string;
          customerSurname: string;
          customerPhone: string;
          customerEmail: string;
          reservationTimestamp: string;
          reservationState: string;
          reservationId: string;
        } = {
          bookingDate: "",
          bookingHour: "",
          bookingSalon: "",
          bookingService: "",
          customerName: "",
          customerSurname: "",
          customerPhone: "",
          customerEmail: "",
          reservationTimestamp: "",
          reservationState: "",
          reservationId: ""
        };
        const beautySalons = new Array<BeautySalon>();
        const services = new Array<Service>();

        const reservationResult = await db
          .collection(
            `Sites/${request.body.siteId}/modules/salon-booking/reservations`
          )
          .doc(request.body.reservationId)
          .get();

        reservation = {
          bookingDate: moment(
            reservationResult.data()!.bookingDate.toDate()
          ).format("dddd, DD [de] MMMM [de] YYYY"),
          bookingHour: reservationResult.data()!.bookingHour,
          bookingSalon: reservationResult.data()!.bookingSalon,
          bookingService: reservationResult.data()!.bookingService,
          customerName: reservationResult.data()!.customerName,
          customerSurname: reservationResult.data()!.customerSurname,
          customerPhone: reservationResult.data()!.customerPhone,
          customerEmail: reservationResult.data()!.customerEmail,
          reservationTimestamp: reservationResult.data()!.reservationTimestamp,
          reservationState: reservationResult.data()!.reservationState,
          reservationId: reservationResult.id
        };
        const beautySalonsResult = await db
          .collection(
            `Sites/${request.body.siteId}/modules/salon-booking/beauty-salons`
          )
          .get();
        beautySalonsResult.forEach(
          (element: firebase.firestore.QueryDocumentSnapshot) => {
            beautySalons.push({
              id: element.id,
              name: element.data()!.name,
              schedule: element.data()!.schedule,
              shiftBasedOnCalendar: element.data()!.shiftBasedOnCalendar,
              shiftBasedOnSchedule: element.data()!.shiftBasedOnSchedule
            });
          }
        );
        reservation.bookingSalon = beautySalons.find(
          (x: any) => x.id === reservation.bookingSalon
        )!.name;

        const servicesResult = await db
          .collection(
            `Sites/${request.body.siteId}/modules/salon-booking/services`
          )
          .get();

        servicesResult.forEach(
          (element: firebase.firestore.QueryDocumentSnapshot) => {
            services.push({
              id: element.id,
              name: element.data()!.name
            });
          }
        );
        reservation.bookingService = services.find(
          (x: any) => x.id === reservation.bookingService
        )!.name;

        // tslint:disable-next-line: no-console
        console.log(reservation);

        try {
          const params = {
            Destination: {
              ToAddresses: [
                "tecnica@eldescubrimiento.com",
                "staff@yhairstylist.com"
              ]
            },
            Message: {
              Body: {
                Html: {
                  Charset: "UTF-8",
                  Data: `
                  <div>
                    <div style="max-width: 600px; margin: 0 auto; padding: 0 40px;">
                        <div
                            style="background-color: #dcdfe6; position: relative;display: block; height: 1px; width: 100%; margin: 24px 0;">
                            <div
                                style="left: 20px; -webkit-transform: translateY(-50%); transform: translateY(-50%); position: absolute; background-color: #fff; padding: 0 20px; color: #303133;">
                                Datos de la reserva</div>
                        </div>
                        <table>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Id de reserva:</td>
                                <td>${reservation.reservationId}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Fecha:</td>
                                <td>${reservation.bookingDate}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Hora:</td>
                                <td>${reservation.bookingHour}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Salon:</td>
                                <td>${reservation.bookingSalon}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Servicio:</td>
                                <td>${reservation.bookingService}</td>
                            </tr>
                        </table>
                        <div
                            style="background-color: #dcdfe6; position: relative;display: block; height: 1px; width: 100%; margin: 24px 0;">
                            <div
                                style="left: 20px; -webkit-transform: translateY(-50%); transform: translateY(-50%); position: absolute; background-color: #fff; padding: 0 20px; color: #303133;">
                                Datos del titular</div>
                        </div>
                        <table>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Nombre:</td>
                                <td>${reservation.customerName}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Apellido:</td>
                                <td>${reservation.customerSurname}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">Teléfono:</td>
                                <td>${reservation.customerPhone}</td>
                            </tr>
                            <tr>
                                <td style="font-weight: 600; min-width: 80px;">E-mail:</td>
                                <td>${reservation.customerEmail}</td>
                            </tr>
                        </table>
                        <div
                            style="background-color: #dcdfe6; position: relative;display: block; height: 1px; width: 100%; margin: 24px 0;">
                            <div
                                style="left: 20px; -webkit-transform: translateY(-50%); transform: translateY(-50%); position: absolute; background-color: #fff; padding: 0 20px; color: #303133;">
                                Información a tener en cuenta</div>
                        </div><span>Su reserva está generada en estado pendiente, una vez que nuestro staff reciba la misma, se
                            comunicará con usted para confirmarla.</span>
                    </div>
                </div>`
                }
              },
              Subject: {
                Charset: "UTF-8",
                Data: "Nueva reserva"
              }
            },
            Source:
              // tslint:disable-next-line: quotemark
              '"Yhair Stylist | Reservas Web" <reservas-web@yhairstylist.com>',
            ReplyToAddresses: [
              // tslint:disable-next-line: quotemark
              '"Yhair Stylist | Reservas Web" <staff@yhairstylist.com>'
              /* more items */
            ]
          };

          await new aws.SES({ apiVersion: "2010-12-01" })
            .sendEmail(params)
            .promise();

          params.Destination.ToAddresses = [reservation.customerEmail];
          params.Message.Body.Html.Data = `
          <div>
            <div style="max-width: 600px; margin: 0 auto; padding: 0 40px;">
                <div
                    style="background-color: #dcdfe6; position: relative;display: block; height: 1px; width: 100%; margin: 24px 0;">
                    <div
                        style="left: 20px; -webkit-transform: translateY(-50%); transform: translateY(-50%); position: absolute; background-color: #fff; padding: 0 20px; color: #303133;">
                        Datos de la reserva</div>
                </div>
                <table>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Id de reserva:</td>
                        <td>${reservation.reservationId}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Fecha:</td>
                        <td>${reservation.bookingDate}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Hora:</td>
                        <td>${reservation.bookingHour}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Salon:</td>
                        <td>${reservation.bookingSalon}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Servicio:</td>
                        <td>${reservation.bookingService}</td>
                    </tr>
                </table>
                <div
                    style="background-color: #dcdfe6; position: relative;display: block; height: 1px; width: 100%; margin: 24px 0;">
                    <div
                        style="left: 20px; -webkit-transform: translateY(-50%); transform: translateY(-50%); position: absolute; background-color: #fff; padding: 0 20px; color: #303133;">
                        Datos del titular</div>
                </div>
                <table>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Nombre:</td>
                        <td>${reservation.customerName}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Apellido:</td>
                        <td>${reservation.customerSurname}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">Teléfono:</td>
                        <td>${reservation.customerPhone}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600; min-width: 80px;">E-mail:</td>
                        <td>${reservation.customerEmail}</td>
                    </tr>
                </table>
                <div
                    style="background-color: #dcdfe6; position: relative;display: block; height: 1px; width: 100%; margin: 24px 0;">
                    <div
                        style="left: 20px; -webkit-transform: translateY(-50%); transform: translateY(-50%); position: absolute; background-color: #fff; padding: 0 20px; color: #303133;">
                        Información a tener en cuenta</div>
                </div><span>Su reserva está generada en estado pendiente, una vez que nuestro staff reciba la misma, se
                    comunicará con usted para confirmarla.</span>
            </div>
        </div>`;

          await new aws.SES({ apiVersion: "2010-12-01" })
            .sendEmail(params)
            .promise();
        } catch (error) {
          // tslint:disable-next-line: no-console
          console.error(error);
        }
        response.sendStatus(200);
      } catch (error) {
        // tslint:disable-next-line: no-console
        console.error(error);
        response.sendStatus(500);
      }
    });
  }
);
