
import { Component } from "preact";

export default class App extends Component {
  state = {
    prefix: "",
    number: "",
    result: "",
    loading: false,
    errors: false
  };

  ref0 = null;
  ref1 = null;

  validate = () => {
    this.setState({ errors: false })
    for (let i = 0; i < 2; i++) {
      if (!this[`ref${i}`].value || isNaN(this[`ref${i}`].value)) {
        this[`ref${i}`].classList.add("fc__input--error");
        this.setState({ errors: true })
      }
    }

    if (!this.state.errors) this.makeFetch();
  };

  makeFetch = () => {
    this.setState({ result: "", loading: true });
    fetch(
      `https://api.cargo-tracker.ru/track?prefix=${
        this.state.prefix
      }&number=${this.state.number}`
    )
      .then(response => response.json())
      .then(response => {
        this.setState({ result: response.result });
      })
      .catch(error => {
        this.setState({ result: { error: `Ощибка! ${error.message}` } });
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  setPrefix = e => {
    e.target.classList.remove("fc__input--error");
    this.setState({ errors: false })
    this.setState({ prefix: e.target.value });
  };

  setNumber = e => {
    e.target.classList.remove("fc__input--error");
    this.setState({ errors: false })
    this.setState({ number: e.target.value });
  };

  render(props, { prefix, number, result, loading, errors }) {
    return (
      <div class="fc">
        <input
          class="fc__input fc__input--prefix"
          type="text"
          value={prefix}
          onInput={this.setPrefix}
          ref={dom => (this.ref0 = dom)}
        />
        <input
          class="fc__input fc__input--number"
          type="text"
          value={number}
          onInput={this.setNumber}
          ref={dom => (this.ref1 = dom)}
        />
        <button class="fc__button" onClick={this.validate}>
          Проверить
        </button>
        {errors && 
        <div class="fc__error-message">
          Поля числовые и обязательные
        </div>
  }
        <div class="fc__results">
          {loading && <div class="fc__loader" />}
          <div
            dangerouslySetInnerHTML={{ __html: result.success || result.error }}
          />
        </div>
      </div>
    );
  }
}

