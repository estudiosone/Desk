import Documento from '../Documento';

interface IUsuario {
  NombreDeUsuario: string,
  FotoURL: string,
}
export class Usuario extends Documento<IUsuario> {

}