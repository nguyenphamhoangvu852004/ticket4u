import { resaleTickets } from "../data/homeData";
import EventCard from "../../../ui/EventCard";

export default function ResaleTickets() {
  return (
    <div className="border-box mx-auto relative h-[298px] mt-[96px] mb-[56px] w-[1248px]">
      <div
        className="absolute inset-y-10 h-full w-full bg-no-repeat"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE5OSIgaGVpZ2h0PSIyNzMiIHZpZXdCb3g9IjAgMCAxMTk5IDI3MyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTUyMy4xNDkgNTUuOTk3NkMzODAuNDk4IDEzLjg0NjcgMTg3LjYxMiA3My41NjA1IDEwOSAxMDguNjg2VjI3Mi41SDgwNUM3NzAuNDg4IDIxNy44OTUgNjY1LjggOTguMTQ4NSA1MjMuMTQ5IDU1Ljk5NzZaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfNTg0M181NTI1MjIpIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMzk0LjUgMTY0LjUwMUMyMDAuOTU3IDkuNjY2NjggODMuNzk4NiAzNS45Mjc0IDguMjIzOTggNjAuMzIzQzMuMjk5NDYgNjEuOTEyNiAwIDY2LjUwOTUgMCA3MS42ODQyVjI2MC41MThDMCAyNjcuMTQ1IDUuMzcyNTcgMjcyLjUxOCAxMiAyNzIuNTE4TDExODEuMTggMjcyLjUxOEMxMTg5LjU2IDI3Mi41MTggMTE5NC42NiAyNjQuMzAyIDExODguNzYgMjU4LjM0NEMxMTYzLjczIDIzMy4wMzcgMTA5Ny42MSAyMDcuNSAxMDAwLjUgMjA3LjVDODAyIDIwNy41IDU4NC41IDMxNi41IDM5NC41IDE2NC41MDFaIiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXJfNTg0M181NTI1MjIpIi8+CjxwYXRoIGQ9Ik0yOTIuNSAxMzJDMTczLjE0NiAtMzIuNzM2NSA2MC4xNDk4IDEuMTMzODggMTIuNDY2IDcuNjExNjhDNS43MDA1MSA4LjUzMDc2IDAgMTQuMTk0IDAgMjEuMDIxNlYyNjAuMTk4QzAgMjY2LjgyNSA1LjI4NDg0IDI3Mi4xOTggMTEuOTEyMyAyNzIuMTk4SDczOC45NjZDNzQ2Ljg1NiAyNzIuMTk4IDc1Mi41MDcgMjY0LjU5MSA3NDkuMDE5IDI1Ny41MTNDNjkyLjQ5NiAxNDIuODEgMzgyLjM0MiAyNTYuMDAzIDI5Mi41IDEzMloiIGZpbGw9IiM4M0YzQjkiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNTg0M181NTI1MjIiIHgxPSIxMDkiIHkxPSI0OC44MzIiIHgyPSI3OTAuNjk2IiB5Mj0iMzA5Ljg1NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjI2Nzk4IiBzdG9wLWNvbG9yPSIjMkVDMjc0Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZBRDMwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXJfNTg0M181NTI1MjIiIHgxPSItMy41NDk3NGUtMDUiIHkxPSI2MC4yOTIxIiB4Mj0iNjA1IiB5Mj0iMjcyLjUxNyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjI2Nzk4IiBzdG9wLWNvbG9yPSIjMkVDMjc0Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZBRDMwMCIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPgo=')",
        }}
      />

      <div className="relative z-10 flex justify-start gap-[16px] h-full pt-[16px]">
        <div className="flex justify-center pr-[56px] pl-[56px]">
          <img
            src="https://salt.tkbcdn.com/ts/ds/d8/b7/4e/313ff0caab3c8f518be523da266c0fe7.png"
            alt="Resale"
            className="object-contain"
          />
        </div>

        <div className="flex flex-row gap-[16px]">
          {resaleTickets.map((event, idx) => (
            <div
              key={idx}
              className="p-[12px] max-w-[304px] rounded-[12px] backdrop-blur bg-[rgba(86,92,106,0.5)]"
            >
              <EventCard event={event} theme="dark" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
