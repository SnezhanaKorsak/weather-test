export type EventsListResponse = {
  result: {
    items: EventItemResponse[];
  };
};

export type EventItemResponse = {
  created: string;
  creator: {
    email: string;
    self: true;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  htmlLink: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  summary: string;
};
