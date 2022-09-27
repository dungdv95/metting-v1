const initState = {
  sidebarVisible: false,
  sidebarContent: {
    content: "connection", // "connection-joined", // "connection-joined" |connection-pending" | |connection-add" |"chat" |
    mode: "joined",
  },
  current: "sidebar", // "sidebar" | "webinar" | "grid"
  sidebar: {
    page: 1,
    pageSize: 3,
    pageLoading: false,
  },
  grid: {
    page: 1,
    pageSize: 15,
    pageLoading: false,
  },
  searchContent: {
    checkName: "",
    checkType: "all",
    lengthFilter: 0,
    visibleOptionType: false,
  },
};

const SET_SIDEBAR_VISIBLE = "layout/set_sidebar_visible";
const SET_SIDEBAR_CONTENT = "layout/set_sidebar_content";
const SHOW_CONNECTION_JOINED = "layout/show_connection_list";
const SHOW_CONNECTION_PENDING = "layout/show_connection_pending";
const SHOW_CONNECTION_ADD = "layout/show_connection_add";
const SHOW_CHAT = "layout/show_chat";
const TOGGLE_CONNECTION_LIST = "layout/toggle_connection_list";
const NEXT_PAGE_LAYOUT_SIDEBAR = "layout/next_page_layout_sidebar";
const PREV_PAGE_LAYOUT_SIDEBAR = "layout/prev_page_layout_sidebar";
const NEXT_PAGE_LAYOUT_GRID = "layout/next_page_layout_grid";
const PREV_PAGE_LAYOUT_GRID = "layout/prev_page_layout_grid";
const SET_PAGE_LAYOUT_SIDEBAR = "layout/set_page_layout_sidebar";
const SET_PAGE_LAYOUT_GRID = "layout/set_page_layout_grid";
const SET_LAYOUT_WEBINAR = "layout/set_layout_webinar";
const SET_LAYOUT_SIDEBAR = "layout/set_layout_sidebar";
const SET_LAYOUT_GRID = "layout/set_layout_grid";
const SET_LAYOUT_SIDEBAR_PAGE_LOADING = "layout/set_layout_sidebar_loading";
const SET_CONTENT_SEARCH_NAME = "layout/set_content_search_name";
const SET_CONTENT_SEARCH_TYPE = "layout/set_content_search_type";
const UPDATE_LENGTH_FILTER = "layout/update_length_filter";
const SHOW_OPTION_TYPE = "layout/hide_visible_option_type";

function layoutReducer(state = initState, action) {
  switch (action.type) {
    case SET_LAYOUT_SIDEBAR_PAGE_LOADING:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          pageLoading: action.payload,
        },
      };
    case SET_SIDEBAR_VISIBLE:
      return { ...state, sidebarVisible: action.payload };
    case SET_SIDEBAR_CONTENT:
      return { ...state, sidebarContent: action.payload };
    case SHOW_CONNECTION_JOINED:
      return {
        ...state,
        sidebarVisible: true,
        sidebarContent: {
          content: "connection",
          mode: "joined",
        },
      };
    case SHOW_CONNECTION_PENDING:
      return {
        ...state,
        sidebarVisible: true,
        sidebarContent: {
          content: "connection",
          mode: "pending",
        },
      };
    case SHOW_CONNECTION_ADD:
      return {
        ...state,
        sidebarVisible: true,
        sidebarContent: {
          content: "connection",
          mode: "add",
        },
      };
    case SHOW_CHAT:
      return {
        ...state,
        sidebarVisible: true,
        sidebarContent: {
          ...state.sidebarContent,
          content: "chat",
        },
      };
    case TOGGLE_CONNECTION_LIST:
      return {
        ...state,
        sidebarVisible: true,
        sidebarContent: {
          ...state.sidebarContent,
          content: "connection",
        },
      };
    case NEXT_PAGE_LAYOUT_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          page: state.sidebar.page + 1,
        },
      };
    case PREV_PAGE_LAYOUT_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          page: state.sidebar.page - 1,
        },
      };
    case NEXT_PAGE_LAYOUT_GRID:
      return {
        ...state,
        grid: {
          ...state.grid,
          page: state.grid.page + 1,
        },
      };

    case PREV_PAGE_LAYOUT_GRID:
      return {
        ...state,
        grid: {
          ...state.grid,
          page: state.grid.page - 1,
        },
      };
    case SET_PAGE_LAYOUT_SIDEBAR:
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          page: action.payload,
        },
      };
    case SET_PAGE_LAYOUT_GRID:
      return {
        ...state,
        grid: {
          ...state.grid,
          page: action.payload,
        },
      };
    case SET_LAYOUT_SIDEBAR:
      return { ...state, current: "sidebar" };
    case SET_LAYOUT_WEBINAR:
      return { ...state, current: "webinar" };
    case SET_LAYOUT_GRID:
      return { ...state, current: "grid" };
    case SET_CONTENT_SEARCH_NAME:
      return {
        ...state,
        searchContent: {
          ...state.searchContent,
          checkName: action.payload,
        },
      };
    case SET_CONTENT_SEARCH_TYPE:
      return {
        ...state,
        searchContent: {
          ...state.searchContent,
          checkType: action.payload,
          visibleOptionType: false,
        },
      };
    case UPDATE_LENGTH_FILTER:
      return {
        ...state,
        searchContent: {
          ...state.searchContent,
          lengthFilter: action.payload,
        },
      };
    case SHOW_OPTION_TYPE:
      return {
        ...state,
        searchContent: {
          ...state.searchContent,
          visibleOptionType: true,
        },
      };
    default:
      return state;
  }
}

const LayoutActions = {
  hideSidebar() {
    return { type: SET_SIDEBAR_VISIBLE, payload: false };
  },
  showConnectionJoined() {
    return { type: SHOW_CONNECTION_JOINED };
  },
  showConnectionPending() {
    return { type: SHOW_CONNECTION_PENDING };
  },
  showConnectionAdd() {
    return { type: SHOW_CONNECTION_ADD };
  },
  showChat() {
    return { type: SHOW_CHAT };
  },
  nextPageLayoutSidebar() {
    return { type: NEXT_PAGE_LAYOUT_SIDEBAR };
  },
  prevPageLayoutSidebar() {
    return { type: PREV_PAGE_LAYOUT_SIDEBAR };
  },
  nextPageLayoutGrid() {
    return { type: NEXT_PAGE_LAYOUT_GRID };
  },
  prevPageLayoutGrid() {
    return { type: PREV_PAGE_LAYOUT_GRID };
  },
  setPageLayoutSidebar(page) {
    return { type: SET_PAGE_LAYOUT_SIDEBAR, payload: page };
  },
  setPageLayoutGrid(page) {
    return { type: SET_PAGE_LAYOUT_GRID, payload: page };
  },
  setLayoutSidebar() {
    return { type: SET_LAYOUT_SIDEBAR };
  },
  setLayoutWebinar() {
    return { type: SET_LAYOUT_WEBINAR };
  },
  setLayoutGrid() {
    return { type: SET_LAYOUT_GRID };
  },
  setLayoutSidebarPageLoading(loading) {
    return { type: SET_LAYOUT_SIDEBAR_PAGE_LOADING, payload: loading };
  },
  toggleConnectionList() {
    return { type: TOGGLE_CONNECTION_LIST };
  },
  setContentSearchName(content) {
    return { type: SET_CONTENT_SEARCH_NAME, payload: content };
  },
  setContentSearchType(content) {
    return { type: SET_CONTENT_SEARCH_TYPE, payload: content };
  },
  updateLengthFilter(length) {
    return { type: UPDATE_LENGTH_FILTER, payload: length };
  },
  showOptiontType() {
    return { type: SHOW_OPTION_TYPE };
  },
};

export { layoutReducer, LayoutActions };
