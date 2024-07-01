import { ISODateString } from "next-auth";

export type Content = {
  id: number;
  status: string;
  user_created: string;
  date_created: ISODateString;
  user_updated: string;
  date_updated: ISODateString;
  title: string;
  article: string;
  age_min: number | null;
  age_max: number | null;
  parent: [Content] | [];
  next: [Content] | [];
  topics: ({ Topic_id: Topic } | number)[];
  locations: ({ Location_id: Location } | number)[];
};

export type Topic = {
  id: number;
  user_created: string;
  date_created: ISODateString;
  user_updated: string;
  date_updated: ISODateString;
  name: string;
  parent: [{ related_Topic_id: Topic | number }] | [];
};

export type Location = {
  id: number;
  user_created: string;
  date_created: ISODateString;
  user_updated: string;
  date_updated: ISODateString;
  name: string;
  type: string;
  parent_location: [{ related_Location_id: Location | number }] | [];
};
