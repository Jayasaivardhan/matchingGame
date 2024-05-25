import {Component} from 'react'
import './index.css'

class MatchGame extends Component {
  state = {
    imgId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
    score: 0,
    end: false,
    imgCount: 0,
    clock: 60,
    selected: 'FRUIT',
  }

  componentDidMount() {
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {clock} = this.state
    if (clock !== 0) {
      this.setState(prevState => ({clock: prevState.clock - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({end: true})
    }
  }

  clin = event => {
    this.setState({selected: event.target.getAttribute('id')})
  }

  img = event => {
    const {imgId, imgCount} = this.state
    const {imagesList} = this.props
    const value = event.target.getAttribute('id') === imgId
    if (value) {
      const number = Math.floor(Math.random() * 30)
      this.setState(prev => ({
        imgId: imagesList[number].id,
        imgCount: number,
        score: prev.score + 1,
      }))
    } else {
      this.setState({end: true, clock: 0})
      clearInterval(this.timerId)
    }
  }

  start = () => {
    this.setState({
      imgId: 'b11ec8ce-35c9-4d67-a7f7-07516d0d8186',
      score: 0,
      imgCount: 0,
      end: false,
      clock: 60,
      selected: 'FRUIT',
    })
    this.timerId = setInterval(this.statusChange, 1000)
  }

  render() {
    const {score, clock, imgCount, selected, end} = this.state
    const {tabsList, imagesList} = this.props
    const {id, imageUrl} = imagesList[imgCount]
    const filterList = imagesList.filter(
      imageItem => selected === imageItem.category,
    )
    return (
      <div>
        <nav className="bar">
          <img
            className="logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
          />

          <ul className="score-time">
            <li className="lists">
              <p className="para-score">
                Score: <span className="realScore">{score} </span>
              </p>
            </li>
            <li className="lists score-time">
              <img
                className="timer-bt"
                alt="timer"
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
              />
              <p className="sec">{clock} sec</p>
            </li>
          </ul>
        </nav>
        {end ? (
          <div className="games">
            <div className="end-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                alt="trophy"
                className="trophy"
              />
              <p className="he2 unhighLight"> YOUR SCORE </p>
              <p className="he2 unhighLight"> {score}</p>
              <button onClick={this.start} type="button" className="playAgain">
                <img
                  className="reset"
                  alt="reset"
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                />
                PLAY AGAIN
              </button>
            </div>
          </div>
        ) : (
          <div className="game">
            <img alt="match" className="matchImg" id={id} src={imageUrl} />
            <ul className="galga">
              {tabsList.map(tabItem => {
                const {tabId, displayText} = tabItem
                return (
                  <li key={tabId} className="lists">
                    <button
                      id={tabId}
                      onClick={this.clin}
                      type="button"
                      className={`but ${
                        selected === tabId ? 'highLight' : 'unhighLight'
                      }`}
                    >
                      {displayText}
                    </button>
                  </li>
                )
              })}
            </ul>

            <ul className="matching">
              {filterList.map(imageItem => {
                const {id, thumbnailUrl} = imageItem
                return (
                  <li key={id} className="lists">
                    <img
                      onClick={this.img}
                      id={id}
                      alt="thumbnail"
                      src={thumbnailUrl}
                      className="images"
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default MatchGame
