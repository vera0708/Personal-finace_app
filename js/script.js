import { categoryListControl } from "./categoriesControl.js";
import { financeControl } from "./financeControl.js"
import { reportControl } from "./reportControl.js";

const init = () => {
    financeControl();
    reportControl();
    categoryListControl();
}

init();