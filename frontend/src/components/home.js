import React, { Component } from "react";
import "../styles/components/home.scss";
import "animate.css";
export default class Layout extends Component {
  render() {
    return (
      <div className="layout">
        <div className="info">
          <div className="info-label animate__animated animate__fadeInLeftBig">
            <label>What is the Chat App?</label>
            <div>
              <article>
                Chat app is a web-based chat application. It offers you a lot of
                features in the chat and you can use it freely whenever you
                want. Chat app is completely free and does not require you to
                pay anything. Add your friend and start chatting right away.
                <br></br>
                <br></br>
                You can support me by giving me feedback about my application.
                <a href="Contact"> Contact..</a>
              </article>
            </div>
          </div>
          <div className="info-image animate__animated animate__fadeInRightBig">
            <img
              src="https://64.media.tumblr.com/8084fed11537bceb398e00a9e2453227/tumblr_inline_o7u6lvvckK1qfeh9b_1280.png"
              alt="Mesajlasma Uygulamaları"
            ></img>
          </div>
        </div>
        <div className="why">
          <label className="why-title">Why Chat App?</label>
          <div className="why-info">
            <div className="why-info-speed animate__animated animate__fadeInLeftBig">
              <div className="why-info-speed-article">
                <label>Speed</label>
                <article>
                  Speed is just one of the main features of the chat app. Users
                  can start messaging quickly after logging in.
                </article>
              </div>
              <div className="why-info-speed-image">
                <img
                  src="https://media0.giphy.com/media/xT4uQyZJVKYYHmFqIU/200.gif"
                  alt="Hiz Gif"
                ></img>
              </div>
            </div>
            <div className="why-info-fun animate__animated animate__fadeInRightBig">
              <div className="why-info-fun-article">
                <label>Fun</label>
                <article>
                  Speed is just one of the main features of the chat app. Users
                  can start messaging quickly after logging in.
                </article>
              </div>
              <div className="why-info-fun-image">
                <img
                  src="https://media4.giphy.com/media/lmv5aDvwOgTmby3a13/200.gif"
                  alt="Mesajlasma Uygulamaları"
                ></img>
              </div>
            </div>
            <div className="why-info-security animate__animated animate__fadeInLeftBig">
              <div className="why-info-security-article">
                <label>Security</label>
                <article>
                  Speed is just one of the main features of the chat app. Users
                  can start messaging quickly after logging in.
                </article>
              </div>
              <div className="why-info-security-image">
                <img
                  src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Security-Checkup_F1xsrhr.gif"
                  alt="Mesajlasma Uygulamaları"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
