import buddhistEra from "@/lib/buddhistEra";
import dayjs from "dayjs";
import "dayjs/locale/th"; // Import Thai locale

// Extend Day.js with the Buddhist Era plugin
dayjs.extend(buddhistEra);
dayjs.locale("th"); // Set Thai as the default locale

export function ThaiDateTimeCell({ date }: { date: string }) {
    return (
        <td
            style={{
                padding: "8px",
                border: "1px solid #ddd",
            }}
        >
            {dayjs(date).format("DD MMMM BBBB HH:mm:ss")}{" "}
        </td>
    );
}
