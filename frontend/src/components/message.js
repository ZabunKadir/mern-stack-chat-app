import { Label } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/components/message.scss";
export default function Message({ message, own }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    const getUser = async () => {
      if (!message.sender) {
        return;
      }
      try {
        const res = await axios.get(
          "http://localhost:5000/api/users?_id=" + message?.sender
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message]);

  const timeAgo = (gelen_saat) => {
    var gelen_saat = new Date(gelen_saat).getTime();
    var suanki_saat = new Date().getTime();

    if (isNaN(gelen_saat)) {
      return "";
    }

    if (gelen_saat < suanki_saat) {
      var sure_farki = (suanki_saat - gelen_saat) / 1000;
    } else {
      var array = {
        hata: "olumsuz",
      };
      return array;
    }
    var dakika = 60;
    var saat = dakika * 60;
    var gun = saat * 24;
    var ay = gun * 30;
    var yil = ay * 12;

    var yil_farki = Math.floor(sure_farki / yil);
    var ay_farki = Math.floor((sure_farki % yil) / ay);
    var gun_farki = Math.floor((sure_farki % ay) / gun);
    var saat_farki = Math.floor((sure_farki % gun) / saat);
    var dakika_farki = Math.floor((sure_farki % saat) / dakika);
    var saniye_farki = Math.floor(sure_farki % dakika);

    array = {
      yil_farki: yil_farki,
      ay_farki: ay_farki,
      gun_farki: gun_farki,
      saat_farki: saat_farki,
      dakika_farki: dakika_farki,
      saniye_farki: saniye_farki,
    };
    return array;
  };
  function gecenSureYaz(dizi) {
    if (dizi.yil_farki > 0) {
      return dizi.yil_farki + " year ago";
    } else if (dizi.ay_farki > 0) {
      return dizi.ay_farki + " month ago";
    } else if (dizi.gun_farki > 0) {
      return dizi.gun_farki + "  day ago";
    } else if (dizi.saat_farki > 0) {
      if (dizi.saat_farki > 1) {
        return dizi.saat_farki + " hours ago";
      }
      return dizi.saat_farki + " hour ago";
    } else if (dizi.dakika_farki > 0) {
      if (dizi.dakika_farki > 1) {
        return dizi.dakika_farki + "  mins ago";
      }
      return dizi.dakika_farki + "  min ago";
    } else if (dizi.saniye_farki > 0) {
      return dizi.saniye_farki + " second ago";
    } else if (dizi.hata) {
      // Get_time fonksiyonuna gelecek bir tarih girdiğinde hata alıyoruz.
      return "Gelecek bir tarih girdiniz";
    } else {
      return "Now";
    }
  }
  return (
    <div
      className={
        own
          ? "message-own animate__animated animate__fadeIn"
          : "message animate__animated animate__fadeIn"
      }
    >
      <div className="message-top">
        <div className="message-main-username">
          <Label>
            {user?.name || ""} {user?.surname || ""}
          </Label>
        </div>
      </div>
      <div className="message-main">
        <div className="message-main-message">
          <Label className="message-main-text">{message.text}</Label>
        </div>
      </div>
      <div className="message-bottom">
        <div className="message-bottom-time">
          <Label>{gecenSureYaz(timeAgo(message.createdAt))}</Label>
        </div>
      </div>
    </div>
  );
}
