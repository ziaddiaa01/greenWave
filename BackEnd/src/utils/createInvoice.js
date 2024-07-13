import fs from "fs"
import path from "path";
import {fileURLToPath} from "url"
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import PDFDocument from "pdfkit"

export function createInvoice(invoice, path) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateFooter(doc);

    console.log("Attempting to write PDF to:", path);

    doc.pipe(fs.createWriteStream(path));
    doc.end();
    doc.on('error', (err) => {
        console.error('Error while writing PDF:', err);
    });
}

function generateHeader(doc) {
    const logoPath = path.join(__dirname,'Logo.jpeg')
    doc
        .image(logoPath, 50, 49, { width: 50 })
        .fillColor("#333")
        .fontSize(20)
        .text("Green Wave", 110, 57)
        .fontSize(10)
        //.text("E-Commerce.", 200, 50, { align: "right" })
        //.text("123 Main Street", 200, 65, { align: "right" })
       // .text("Egypt, EG, 10025", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, invoice) {
    doc
        .fillColor("#444444")
        .fontSize(20)
        .text("Invoice", 50, 160)
        .fontSize(17)
        .text(`Order Id Number: #${invoice.customer.id}`, 120, 162)

    generateHr(doc, 185);

    const customerInformationTop = 200;

    doc
        .fontSize(10)
        .text("Email:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(invoice.customer.email, 150, customerInformationTop)
        .font("Helvetica")
        .text("Invoice Date:", 50, customerInformationTop + 15)
        .text(formatDate(new Date()), 150, customerInformationTop + 15)
        .text("Balance Due:", 50, customerInformationTop + 30)
        .text(
            formatCurrency(invoice.customer.TotalPrice*100),
            150,
            customerInformationTop + 30
        )
        .font("Helvetica-Bold")
        .text(invoice.customer.name, 300, customerInformationTop)
        .font("Helvetica")
        .text(invoice.customer.address, 300, customerInformationTop + 15)
        .text(
            'cairo' +
            ", " 
        )
        .moveDown();

    generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Unit Cost",
        "Quantity",
        "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    for (i = 0; i < invoice.items.length; i++) {
        const item = invoice.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.item,
            formatCurrency(item.amount),
            item.quantity,
            formatCurrency(item.amount * item.quantity)
        );
        generateHr(doc, position + 20);
    }
    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        //invoice.subtotal.toFixed(2)
        formatCurrency(invoice.subtotal*100)
    );
    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "",
        "Discounted Amount",
        formatCurrency((invoice.subtotal - invoice.customer.TotalPrice)*100)
    );

    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        duePosition,
        "",
        "",
        "Balance Due",
        formatCurrency(invoice.customer.TotalPrice*100)
    );
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Thank you.",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    item,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency(cents) {
    return (cents / 100) + " EGP";
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return year + "/" + month + "/" + day;
}