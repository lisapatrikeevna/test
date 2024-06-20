import { store } from "../../store/store";

const CONST = {
  uid: "0000664d-bfe6-72fa-0000-c35dd09fbf9c", // The test uid for local debugging
  host: "ip85-215-241-41.pbiaas.com:8030", // Dev XL server
  chatLoginURL: function () {
    return `http://${this.host}/NeoX-chat-open`;
  },
  loginURL: function () {
    return `http://${this.host}/auth/login-user`;
  },
  accessToken: function () {
    return store.getState().user.token.accessToken;
  },
  authToken: function () {
    return `Bearer ${this.accessToken()}`;
  },
  wsURL: function () {
    return `ws://${this.host}/NeoX-chat/api/${this.accessToken()}`;
  },
  pageSize: 32,
};

const EVENT_TYPE = {
  hello: "hello", // reply login ok
  error: "error", // Something went wrong. The "data" field contains a reason

  find: "find", // find a contact/group
  found: "found", // response for find

  echo: "echo", // test (echo) event
  echoReply: "echo-reply", // test (echo reply) event

  group: "group", // group management
  contact: "contact", // contact management
  subscription: "subscription", // subscription management

  message: "message", // publish a message to a group
  selectchat: "selectchat", // select a chat to be active
  getcontacts: "getcontacts", // get my contacts
  contactlist: "contactlist", // contact list event
};

const FIND_MODE = {
  plainText: 0,
  wholeWord: 1,
  regexp: 2,
  default: 0,
};

class ChatService {
  private isLocalDebug: boolean = false;

  private ws: WebSocket | null = null;
  private userId: string = "";
  private isConnected: boolean = false;
  private isLogin: boolean = false;
  private eventsProcessed: number = 0;

  public async chatLogin(success: () => void) {
    console.log("chatLogin -- start");
    const response = this.isLocalDebug
      ? await fetch(CONST.chatLoginURL(), {
          headers: {
            "Content-Type": "application/json",
            user_id: CONST.uid,
            Authorization: CONST.authToken(),
          },
        })
      : await fetch(CONST.chatLoginURL(), {
          headers: {
            "Content-Type": "application/json",
            Authorization: CONST.authToken(),
          },
        });

    console.log("Response:", response);

    // const result = await response.json();
    // console.log("Result:", result);

    if (response.ok) {
      // const content = result;

      // console.log("The content is:", content);
      // ws = new WebSocket(WS_URL);
      // wsSetup();
      success();
    } else {
      console.log(
        `Login error, status: ${response.status}, statusText: ${response.statusText}, URL: ${response.url}`
      );
    }
  }

  // Setup Web Sockets for the Back end
  private wsSetup(): void {
    this.ws = new WebSocket(CONST.wsURL());

    this.ws.addEventListener("open", (event) => {
      this.isConnected = true;
      console.log("Connected to the WebSocket server");
    });

    this.ws.addEventListener("close", (event) => {
      this.isConnected = false;
      console.log("Disconnected from the WebSocket server");
    });

    this.ws.addEventListener("message", (event) => {
      ++this.eventsProcessed;
      const response = JSON.parse(event.data);

      console.log("#", this.eventsProcessed, "got", response);

      switch (response.event) {
        case EVENT_TYPE.error:
          const reason = response.data;

          console.log("Error:", reason);
          break;

        case EVENT_TYPE.found:
          const data = JSON.parse(response.data);

          console.log("found", data);
          break;

        case EVENT_TYPE.hello:
          this.isLogin = true;
          this.userId = response.data;
          console.log("My User ID:", this.userId);
          chatMain();
          break;

        case EVENT_TYPE.echoReply:
          const reply = response.data;

          console.log("Echo reply:", reply);
          break;

        case EVENT_TYPE.contactlist:
          break;

        case EVENT_TYPE.message:
          break;

        default:
      }
    });
  }
}
