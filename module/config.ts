import * as Yup from "yup";

export default Yup.object()
  .shape({
    MONGO_URL: Yup.string().required(),
  })
  .validateSync(process.env);
