"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IconPhoto } from "@tabler/icons-react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DynamicImage from "./DynamicImage";
import { Fade } from "@mui/material";
import { ThaiDateTimeCell } from "./ThaiDateTimeCell";

interface HumanDetectionLogProps {
    sheetData: [string, string, string][] | null;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    boxShadow: 24,
};

function HumanDetectionLog({ sheetData }: HumanDetectionLogProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectImg, setSelectImg] = React.useState<string | null>(null);

    useEffect(() => {
        if (sheetData && sheetData.length > 0) {
            setSelectImg(sheetData[sheetData.length - 1][2]);
        }
    }, [sheetData]);

    const handleImageClick = (imgSrc: string) => {
        setSelectImg(imgSrc);
        handleOpen();
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Fade in={open}>
                    <Box sx={style}>
                        <DynamicImage imgUrl={selectImg || ""} />
                    </Box>
                </Fade>
            </Modal>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                {/* Selected image display */}

                <div
                    style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {sheetData ? (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: "bold",
                                }}
                            >
                                Latest Detected Picture
                            </p>
                            <div
                                style={{ textAlign: "center", height: "100%" }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}
                                >
                                    <Image
                                        src={sheetData[0][2] || ""}
                                        alt={"Dynamic Image"}
                                        width={330}
                                        height={245}
                                        style={{
                                            objectFit: "contain",
                                            borderRadius: "20px",
                                        }} // Optional styling
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Log Table */}
                <div
                    style={{
                        maxHeight: "300px", // Limit the height of the table
                        overflowY: "auto", // Enable vertical scrolling
                        borderRadius: "12px", // Add rounded corners to the scrollable container
                        border: "1px solid #ddd", // Apply border
                        width: "40%", // Set the width of the table
                        marginRight: "50px",
                    }}
                    className="custom-scrollbar"
                >
                    <table
                        style={{
                            borderCollapse: "separate", // Allow for proper border-radius styling
                            borderSpacing: "0", // Ensure no spacing between borders
                            width: "100%",
                            textAlign: "left",
                        }}
                    >
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                        // width: "50px",
                                    }}
                                >
                                    #
                                </th>
                                <th
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                    }}
                                >
                                    Time
                                </th>
                                <th
                                    style={{
                                        padding: "8px",
                                        border: "1px solid #ddd",
                                        width: "100px",
                                    }}
                                >
                                    Image
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sheetData && sheetData.length > 0 ? (
                                sheetData.map((item, index) => (
                                    <tr key={index}>
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            {index + 1}
                                        </td>
                                        <ThaiDateTimeCell date={item[0]} />
                                        <td
                                            style={{
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                            }}
                                        >
                                            <IconPhoto
                                                stroke={2}
                                                onClick={() =>
                                                    handleImageClick(item[2])
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={3}
                                        style={{
                                            padding: "8px",
                                            textAlign: "center",
                                            border: "1px solid #ddd",
                                        }}
                                    >
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default HumanDetectionLog;
