let poly = require("preact-cli/lib/lib/webpack/polyfills");
import "./style.scss";
import { render } from 'preact';
import Widget from "./App.js";

render(<Widget />, document.getElementById('cf'));
