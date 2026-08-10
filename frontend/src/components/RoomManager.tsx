import React, { useState } from "react";
import { Room } from "@/types/timetable";
import { Building, Plus, Trash2, MapPin, CheckCircle } from "lucide-react";

interface RoomManagerProps {
  rooms: Room[];
  onAddRoom: (room: Room) => void;
  onDeleteRoom: (id: string) => void;
}

export const RoomManager: React.FC<RoomManagerProps> = ({
  rooms,
  onAddRoom,
  onDeleteRoom,
}) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [building, setBuilding] = useState("Main Block");
  const [capacity, setCapacity] = useState(70);
  const [type, setType] = useState<Room["type"]>("classroom");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newRoom: Room = {
      id: `r-${Date.now()}`,
      code: code.trim().toUpperCase(),
      name: name.trim() || `Room ${code.trim().toUpperCase()}`,
      building: building.trim() || "Main Block",
      capacity: Number(capacity),
      type,
      isAvailable: true,
    };

    onAddRoom(newRoom);
    setCode("");
    setName("");
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-fit">
            <Building className="w-3.5 h-3.5" />
            Classroom & Laboratory Infrastructure
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-2">
            Classrooms & Specialized Labs
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Add custom classrooms, hardware laboratories, and auditoriums with customized seating capacities and locations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form: Add Custom Room */}
        <div className="lg:col-span-4 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-white/10 pb-3 uppercase tracking-wider">
            <Plus className="w-4 h-4 text-emerald-400" />
            Add Custom Room / Lab
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Room Code *</label>
              <input
                type="text"
                placeholder="e.g. LH-305 or LAB-104"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono font-bold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Room / Lab Name</label>
              <input
                type="text"
                placeholder="e.g. Advanced AI Computing Lab"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Facility Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as Room["type"])}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-semibold focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  <option value="classroom">Classroom</option>
                  <option value="lab">Laboratory</option>
                  <option value="auditorium">Auditorium</option>
                </select>
              </div>

              <div>
                <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Seating Capacity</label>
                <input
                  type="number"
                  min={15}
                  max={500}
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-mono focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-extrabold text-zinc-300 block mb-1.5 uppercase tracking-wider">Building Block</label>
              <input
                type="text"
                placeholder="e.g. Tech Wing Block B"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-3.5 py-2.5 text-white font-medium focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 text-black" />
              Save Room / Lab
            </button>
          </form>
        </div>

        {/* List of Registered Rooms */}
        <div className="lg:col-span-8 bg-[#07070a] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
          <h3 className="text-sm font-black text-white border-b border-white/10 pb-3 uppercase tracking-wider">
            Registered Classrooms & Labs ({rooms.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((r) => (
              <div
                key={r.id}
                className="bg-zinc-900/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs font-mono">
                    {r.code}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-white">{r.name}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {r.building} • <span className="uppercase font-bold text-emerald-400">{r.type}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-0.5">
                      Capacity: {r.capacity} Seats
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteRoom(r.id)}
                  className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  title="Delete Room"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
