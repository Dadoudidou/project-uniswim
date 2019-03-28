import { appendLocalState } from "../../../System/Store/Apollo";
import resolvers from "./resolvers";
import defaults from "./defaults";

export const importStore = () => {
    appendLocalState(resolvers, defaults);
}