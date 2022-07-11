class certainly_sdk {
  constructor() {
    this._events = {};
  }
  on(e, t) {
    this._events[e] || (this._events[e] = []), this._events[e].push(t);
  }
  removeListener(e, t) {
    if (!this._events[e])
      throw new Error(`Can't remove a listener. Event "${e}" doesn't exits.`);
    this._events[e] = this._events[e].filter((e) => e !== t);
  }
  emit(e, t) {
    if (!this._events[e])
      throw new Error(`Can't emit an event. Event "${e}" doesn't exits.`);
    this._events[e].forEach((e) => {
      e(t);
    });
  }
}
const certainly = new certainly_sdk();
certainly.on("ready", function () {});
const handleMyEvent = (e) => {
  console.log("Was fired: ", e);
};
var active_popup;
certainly.on("testEvent", handleMyEvent),
  Smooch.on("ready", function () {
    Smooch.setDelegate({
      beforeDisplay: (e, t) => (e.metadata && e.metadata.is_hidden ? null : e),
    }),
      (Smooch.destroyPopups = function (e) {
        document.querySelector("#certainly-popups-container") &&
          (document.querySelector("#certainly-popups-container").remove(),
          e && e instanceof Function && e());
      }),
      (Smooch.triggerMessage = function (e) {
        setTimeout(
          () => {
            if (
              !Smooch.isOpened() &&
              document.querySelector("iframe[id^='web-messenger-container']")
            ) {
              document.querySelector("#certainly-popups") ||
                (document
                  .querySelector("iframe[id^='web-messenger-container']")
                  .insertAdjacentHTML(
                    "beforebegin",
                    '<div id="certainly-popups-container">\n\t\t\t\t<ul id="certainly-popups">\n\t\t\t\t\t<div id="certainly-popups-close" style="display:none;">X</div>\n\t\t\t\t</ul>\n\t\t\t</div>'
                  ),
                document
                  .querySelector("#certainly-popups-close")
                  .addEventListener("click", function () {
                    Smooch.destroyPopups();
                  })),
                console.log("Rendering popups", e.messages);
              for (let o = 0; o < e.messages.length; o++) {
                var t = `<li class="certainly-message">\n\t\t\t\t<div class="certainly-bubble" title="Chatbot wrote: ${
                  e.messages[o]
                }">${e.messages[o].replace(/\n/g, " <br>")}</div>\n\t\t\t</li>`;
                document
                  .querySelector("#certainly-popups")
                  .insertAdjacentHTML("beforeend", t),
                  document
                    .querySelectorAll(".certainly-message")
                    .forEach(function (t) {
                      setTimeout(function () {
                        (t.style.transform = "scale(1)"),
                          t.addEventListener("click", function () {
                            (active_popup = e),
                              Smooch.destroyPopups(function () {
                                Smooch.open();
                              });
                          }),
                          (document.querySelector(
                            "#certainly-popups-close"
                          ).style.display = "block");
                      }, 1100 * o);
                    });
              }
            }
          },
          e.delay ? e.delay : 1e3
        );
      }),
      Smooch.on("widget:opened", function () {
        console.log("Widget opened"), Smooch.destroyPopups();
        var e = Smooch.getConversations();
        if ((console.log(e), e.length > 0)) {
          var t = e[0];
          t.messages.length > 0
            ? (console.log("Sending a message"),
              Smooch.sendMessage(
                {
                  type: "text",
                  text:
                    active_popup && active_popup.id
                      ? active_popup.id
                      : "returning_visitor",
                  metadata: {
                    trigger_message:
                      active_popup && active_popup.id
                        ? active_popup.id
                        : "returning_visitor",
                    is_hidden: !0,
                  },
                },
                t.id
              ))
            : (console.log("Sending a first message"),
              Smooch.sendMessage(
                {
                  type: "text",
                  text:
                    active_popup && active_popup.id
                      ? active_popup.id
                      : "new_visitor",
                  metadata: {
                    trigger_message:
                      active_popup && active_popup.id
                        ? active_popup.id
                        : "new_visitor",
                    is_hidden: !0,
                  },
                },
                t.id
              )),
            Smooch.loadConversation(t.id);
        } else console.log("No previous Sunshine Conversations conversations"), Smooch.createConversation({ displayName: sunshine_conversations_settings.conversation_name, messages: [{ text: active_popup && active_popup.id ? active_popup.id : "new_visitor", type: "text", metadata: { is_hidden: !0 } }] });
      }),
      window.dispatchEvent(new Event("certainly_popups_ready")),
      Smooch.on("message:received", function (e, t) {
        if (e.metadata && e.metadata.web_action) {
          console.log(e);
          var o = Object.assign({}, e.metadata);
          return (
            o.is_hidden && delete o.is_hidden,
            console.log(e),
            certainly.emit("web_action", o),
            null
          );
        }
      }),
      certainly.emit("ready");
  });
