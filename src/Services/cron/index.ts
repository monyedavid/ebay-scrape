import cron from "node-cron";

/**
 *
 * @param f                   Function| custom fucntion scheduled to run
 * @param schedule_pattern    String| node-cron schedule pattern
 *                            ┌────────────── second (optional)
 *                            │ ┌──────────── minute
 *                            │ │ ┌────────── hour
 *                            │ │ │ ┌──────── day of month
 *                            │ │ │ │ ┌────── month
 *                            │ │ │ │ │ ┌──── day of week
 *                            │ │ │ │ │ │
 *                            │ │ │ │ │ │
 *                            * * * * * *
 */
export default function cron_scheduler(
    f: () => any,
    schedule_pattern: string = "0 */30 * * * *" // run every 30 mins to avoid bans
): (boolean | cron.ScheduledTask)[] {
    if (cron.validate(schedule_pattern)) {
        const task = cron.schedule(schedule_pattern, () => {
            f();
        });

        return [true, task];
    } else return [false];
}
