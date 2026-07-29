import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";

import ImageToPdf from "../pages/ImageToPdf/ImageToPdf";
import PdfToJpg from "../pages/PdfToJpg/PdfToJpg";
import PdfToPng from "../pages/PdfToPng/PdfToPng";
import MergePdf from "../pages/MergePdf/MergePdf";
import SplitPdf from "../pages/SplitPdf/SplitPdf";
import CompressPdf from "../pages/CompressPdf/CompressPdf";
import RotatePdf from "../pages/RotatePdf/RotatePdf";
import ReorderPdf from "../pages/ReorderPdf/ReorderPdf";
import ProtectPdf from "../pages/ProtectPdf/ProtectPdf";
import UnlockPdf from "../pages/UnlockPdf/UnlockPdf";
import SignPdf from "../pages/SignPdf/SignPdf";
import RemovePages from "../pages/RemovePages/RemovePages";
import ExtractPages from "../pages/ExtractPages/ExtractPages";

import PdfToWord from "../pages/PdfToWord/PdfToWord";
import PdfToExcel from "../pages/PdfToExcel/PdfToExcel";
import PdfToPowerPoint from "../pages/PdfToPowerPoint/PdfToPowerPoint";
import PdfToText from "../pages/PdfToText/PdfToText";

import WordToPdf from "../pages/WordToPdf/WordToPdf";
import ExcelToPdf from "../pages/ExcelToPdf/ExcelToPdf";
import PowerPointToPdf from "../pages/PowerPointToPdf/PowerPointToPdf";

const router = createBrowserRouter([

    {
        path: "/",
        element: <Home />
    },

    {
        path: "/image-to-pdf",
        element: <ImageToPdf />
    },

    {
        path: "/pdf-to-jpg",
        element: <PdfToJpg />
    },

    {
        path: "/pdf-to-png",
        element: <PdfToPng />
    },

    {
        path: "/merge-pdf",
        element: <MergePdf />
    },

    {
        path: "/split-pdf",
        element: <SplitPdf />
    },

    {
        path: "/compress-pdf",
        element: <CompressPdf />
    },

    {
        path: "/rotate-pdf",
        element: <RotatePdf />
    },

    {
        path: "/reorder-pdf",
        element: <ReorderPdf />
    },

    {
        path: "/protect-pdf",
        element: <ProtectPdf />
    },

    {
        path: "/unlock-pdf",
        element: <UnlockPdf />
    },

    {
        path: "/sign-pdf",
        element: <SignPdf />
    },

    {
        path: "/remove-pages",
        element: <RemovePages />
    },

    {
        path: "/extract-pages",
        element: <ExtractPages />
    },

    {
        path: "/pdf-to-word",
        element: <PdfToWord />
    },

    {
        path: "/pdf-to-excel",
        element: <PdfToExcel />
    },

    {
        path: "/pdf-to-powerpoint",
        element: <PdfToPowerPoint />
    },

    {
        path: "/pdf-to-text",
        element: <PdfToText />
    },

    {
        path: "/word-to-pdf",
        element: <WordToPdf />
    },

    {
        path: "/excel-to-pdf",
        element: <ExcelToPdf />
    },

    {
        path: "/powerpoint-to-pdf",
        element: <PowerPointToPdf />
    }

]);

export default router;