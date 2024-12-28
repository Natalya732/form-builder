import { useNavigate, useParams } from "react-router-dom";
import Preview from "./Preview/Preview";

export default function SavedFormViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <Preview formId={id} onClose={() => navigate(-1)} />;
}
