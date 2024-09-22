import mongoose, { Connection } from 'mongoose';

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export {};