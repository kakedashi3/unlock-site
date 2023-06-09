import React from "react"
import "./App.css"
import Content from "./Contents.js"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.unlockHandler = this.unlockHandler.bind(this)
    this.checkout = this.checkout.bind(this)
    this.state = {
      locked: "pending" // there are 3 state: pending, locked and unlocked
    }
  }

  /**
   * When the component mounts, listen to events from unlockProtocol
   */
  componentDidMount() {
    window.addEventListener("unlockProtocol", this.unlockHandler)
  }

  /**
   * Make sure we clean things up before unmounting
   */
  componentWillUnmount() {
    window.removeEventListener("unlockProtocol", this.unlockHandler)
  }

  /**
   * Invoked to show the checkout modal provided by Unlock (optional... but convenient!)
   */
  checkout() {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal()
  }

  /**
   * event handler
   * @param {*} e
   */
  unlockHandler(e) {
    this.setState(state => {
      return {
        ...state,
        locked: e.detail
      }
    })
  }

  render() {
    const { locked } = this.state
    return (
      <div className="App">
        <header className="App-header">
          {locked === "locked" && (
            <div onClick={this.checkout} style={{ cursor: "pointer" }}>
              汝、鍵を持て、扉を解放せん{" "}
              <span aria-label="locked" role="img">
                🔒
              </span>
            </div>
          )}
          {locked === "unlocked" && <Content />}
        </header>
      </div>
    )
  }
}

export default App;
