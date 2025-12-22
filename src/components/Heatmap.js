"use client";

import { useEffect, useRef } from "react";

export default function Heatmap({ data, baseColor }) {
    if (!Array.isArray(data)) return null;

    const scrollRef = useRef(null);

    /* ---------- Auto-scroll to today ---------- */
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft =
                scrollRef.current.scrollWidth;
        }
    }, []);

    /* ---------- Color scale ---------- */
    const getColor = count => {
        if (count === 0) return baseColor + "05";

        return baseColor;
    };

    /* ---------- Align to Monday ---------- */
    const first = new Date(data[0].date);
    const startPad = (first.getDay() + 6) % 7;
    const paddedStart = Array(startPad).fill(null).concat(data);

    const endPad = (7 - (paddedStart.length % 7)) % 7;
    const padded = paddedStart.concat(Array(endPad).fill(null));

    const weeks = [];
    for (let i = 0; i < padded.length; i += 7) {
        weeks.push(padded.slice(i, i + 7));
    }

    /* ---------- Month labels ---------- */
    const monthLabels = [];
    let lastMonth = null;

    weeks.forEach((week, i) => {
        const d = week.find(Boolean);
        if (!d) return;

        const month = new Date(d.date).getMonth();
        if (month !== lastMonth) {
            monthLabels.push({
                index: i,
                label: new Date(d.date).toLocaleString("en-US", {
                    month: "short",
                }),
            });
            lastMonth = month;
        }
    });

    return (
        <div
            ref={scrollRef}
            className="overflow-x-auto no-scrollbar"
        >
            <div className="inline-block min-w-max">
                {/* Month labels */}
                <div className="flex text-xs text-[#8b949e] mb-1 pl-8">
                    {weeks.map((_, i) => {
                        const m = monthLabels.find(x => x.index === i);
                        return (
                            <div key={i} className="w-[22px]">
                                {m ? m.label : ""}
                            </div>
                        );
                    })}
                </div>

                {/* Grid */}
                <div className="flex">
                    {/* Weekday labels */}
                    <div className="flex flex-col justify-between mr-2 text-xs text-[#8b949e] h-[136px]"> <div>Mon</div> <div></div> <div>Wed</div> <div></div> <div>Fri</div> <div></div> <div></div> </div>

                    {/* Heatmap */}
                    <div className="flex gap-[4px]">
                        {weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[4px]">
                                {week.map((day, di) => (
                                    <div
                                        key={di}
                                        title={day ? `${day.date}: ${day.count}` : ""}
                                        className="w-[18px] h-[18px] rounded-[3px] border"
                                        style={{
                                            backgroundColor: day ? getColor(day.count) : "transparent",
                                            borderColor: day ? "rgba(240, 246, 252, 0.06)" : "transparent"
                                        }}
                                    />

                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
