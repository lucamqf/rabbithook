import { useParams } from "react-router-dom";

function useQueryParams() {
  const params = useParams();
  return params;
}

export default useQueryParams;
