import { default as Redis } from "ioredis";

// redis://:p3850adaeee37633b86e96275333b005e5ef1c8ffdfcda57641ef440e8b46c7ae @ ec2-54-158-130-134.compute-1.amazonaws.com : 31089

const herokuHost = "ec2-18-210-104-106.compute-1.amazonaws.com";
const herokuPassword =
  "pb5cc93bdb4b4d76dc1b21a95106405d78ce954c2df01b1d922fd697850702cce";
const herokuPort = 19429;

export const redis = new Redis({
  // host: herokuHost,
  // port: herokuPort,
  // password: herokuPassword,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
});

export const subRedis = new Redis({
  // host: herokuHost,
  // port: herokuPort,
  // password: herokuPassword,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
});

export const pubRedis = new Redis({
  // host: herokuHost,
  // port: herokuPort,
  // password: herokuPassword,
  retryStrategy: (times) => {
    // reconnect after
    return Math.min(times * 50, 2000);
  },
});
