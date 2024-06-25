import { store } from "../../../store/store";

export type ChatEvent = {
  event: string; // EVENT_TYPE see below
  data: string; // JSON payload
};

export const CONST = {
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
  maxCallBacks: 64,
};

export const EVENT_TYPE = {
  hello: "hello", // reply login ok
  error: "error", // Something went wrong. The "data" field contains a reason

  find: "find", // find a contact/group
  found: "found", // response for find

  echo: "echo", // test (echo) event
  echoReply: "echo-reply", // test (echo reply) event

  contact: "contact", // contact management
  group: "group", // group management
  subscription: "subscription", // subscription management

  message: "message", // publish a message to a group
  selectChat: "selectchat", // select a chat to be active

  getContacts: "getcontacts", // get my contacts
  contactList: "contactlist", // contact list event
};

const FIND_MODE = {
  plainText: 0,
  wholeWord: 1,
  regexp: 2,
  default: 0,
};

type Stats = {
  eventsProcessed: number;
};

const stats: Stats = {
  eventsProcessed: 0,
};

interface HashTable<T> {
  [key: string]: T;
}

type CallBack = (obj: object | null) => void;
const NOP: CallBack = () => {};

class CallBackManager {
  private id: number;
  private cbList: HashTable<CallBack>;

  constructor() {
    this.id = 0;
    this.cbList = {};
  }

  public put(cb: CallBack, anId: string | null = null): string {
    let key: string | null = anId;

    if (key === null) {
      ++this.id;
      key = this.id.toString();
    }

    this.cbList[key] = cb;

    return key;
  }

  public exec(id: string | null, data: string | null = null): void {
    if (id === null) throw "The callback ID cannot be null";

    const cb: CallBack = this.cbList[id];

    if (cb === undefined) {
      console.log("Undefined callback for", id);

      return;
    }

    // delete this.cbList[id];

    const obj = data === null ? null : JSON.parse(data);

    cb(obj);
  }
}

let chats: ChatService | null = null;

export class ChatService {
  private isLocalDebug: boolean = false;

  private ws: WebSocket | null = null;
  private userId: string = "";
  private isConnected: boolean = false;
  private isLogin: boolean = false;
  private callBacks: CallBackManager;

  constructor() {
    chats = this;
    this.callBacks = new CallBackManager();
  }

  public isOpen(): boolean {
    return this.isLogin;
  }

  public getUserId(): string {
    return this.userId;
  }

  public onError(cb: CallBack): void {
    this.callBacks.put(cb, EVENT_TYPE.error);
  }

  public onEchoReply(cb: CallBack): void {
    this.callBacks.put(cb, EVENT_TYPE.echoReply);
  }

  public onContactList(cb: CallBack): void {
    this.callBacks.put(cb, EVENT_TYPE.contactList);
  }

  public onMessage(cb: CallBack): void {
    this.callBacks.put(cb, EVENT_TYPE.message);
  }

  public async chatLogin(cb: CallBack) {
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
      this.callBacks.put(cb, EVENT_TYPE.hello);
      this.wsSetup();
    } else {
      console.log(
        `Login error, status: ${response.status}, statusText: ${response.statusText}, URL: ${response.url}`
      );
    }
  }

  public shutdown() {
    if (this.ws) this.ws.close();
  }

  public wsSend(ev: ChatEvent): void {
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
    ++stats.eventsProcessed;
    const response: ChatEvent = JSON.parse(event.data);

    console.log("event#", stats.eventsProcessed, "got", response);

    switch (response.event) {
      case EVENT_TYPE.hello:
        this.isLogin = true;
        this.userId = response.data;
        console.log("My User ID:", this.userId);
        break;

      default:
    }

    this.callBacks.exec(response.event, response.data);
  }

  public testRequest(): void {
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
    this.requestFind("@", (items) => {
      console.log("found:", items);
    });
  }

  // find a user/group
  public requestFind(text: string, cb: CallBack): void {
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

    this.callBacks.put(cb, EVENT_TYPE.found);
    this.wsSend(requestEvent);
  }
}
