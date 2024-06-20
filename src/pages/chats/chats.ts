import { store } from "../../store/store";

type ChatEvent = {
  event: string;
  data: string;
};

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

  public async chatLogin() {
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
      this.wsSetup();
    } else {
      console.log(
        `Login error, status: ${response.status}, statusText: ${response.statusText}, URL: ${response.url}`
      );
    }
  }

  private wsSend(ev: ChatEvent): void {
    if (this.ws !== null) this.ws.send(JSON.stringify(ev));
  }

  // Setup Web Sockets for the Back end
  private wsSetup(): void {
    this.ws = new WebSocket(CONST.wsURL());

    this.ws.addEventListener("open", (event) => {
      this.isConnected = true;
      console.log("Connected to the WebSocket server", event.target);
    });

    this.ws.addEventListener("close", (event) => {
      this.isConnected = false;
      console.log("Disconnected from the WebSocket server", event.reason);
    });

    this.ws.addEventListener("message", this.wsEvents);
  }

  private wsEvents(event: MessageEvent<any>): void {
    ++this.eventsProcessed;
    const response : ChatEvent = JSON.parse(event.data);

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
        this.chatMain();
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
  }

  private chatMain(): void {
    console.log("Started");
    // requestEcho("Hello!");

    // requestSubscriptionCreate("02202fc7-ae4a-42c2-9a52-dd1d3c7c5070");
    // requestSubscriptionCreate("0eb28c53-52b3-4e13-9f74-6097d132228e");

    // requestContactCreate("0000664d-b8c1-72fa-0000-c35dd09fbf9a");
    // requestContactCreate("0000664d-d794-72fa-0000-c35dd09fbf9d");

    // requestContactDelete("15dede67-d680-49d1-84f6-ec3679c0172e");

    // requestGroupCreate("1. The Test group A");
    // requestGroupCreate("2. The Test group B");

    // requestGroupDelete("16eeadd3-f3e4-4a31-b480-2ebb2ff58350");
    // requestGroupDelete("9889f4e8-96f5-4a22-875c-3fe09e81e048");
    // requestGroupDelete("a3f631dc-ac42-49b5-b3fe-b59428a652f6");

    // requestFind("");
    // requestMessage("16eeadd3-f3e4-4a31-b480-2ebb2ff58350", "Hello!");

    // requestFind("@");
    // requestFind("voo");
    this.requestFind("");
  }

  // find a user/group
  public requestFind(text: string): void {
    const request = {
      find: text,
      mode: FIND_MODE.default,
      page: 0,
      pageSize: CONST.pageSize,
    };

    const requestEvent: ChatEvent = {
      event: EVENT_TYPE.find,
      data: JSON.stringify(request),
    };

    this.wsSend(requestEvent);
  }
}
