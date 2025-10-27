import Input from "../atoms/Input";
import Label from "../atoms/label";

type AddressFieldKey = "ciudad" | "direccion_detalle" | "codigo_postal"; 

interface Props {
  ciudad: string;
  direccion_detalle: string;
  codigo_postal: string;
  onChange: (field: AddressFieldKey, value: string) => void;
}

const AddressFields = ({
  ciudad,
  direccion_detalle,
  codigo_postal,
  onChange,
}: Props) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <Label text="Ciudad" />
      <Input value={ciudad} onChange={(e) => onChange("ciudad", e.target.value)} />
    </div>

    <div>
      <Label text="Código postal" />
      <Input value={codigo_postal} onChange={(e) => onChange("codigo_postal", e.target.value)} />
    </div>

    <div className="sm:col-span-2">
      <Label text="Dirección de calle" />
      <Input value={direccion_detalle} onChange={(e) => onChange("direccion_detalle", e.target.value)} />
    </div>
  </div>
);

export default AddressFields;