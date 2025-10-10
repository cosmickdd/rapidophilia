// Ticket Generation Service
import QRCode from 'qrcode';
import CONTACT from '../config/contact';

export interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  participants: number;
  message?: string;
  paymentId: string;
  amount: number;
  trekTitle: string;
  bookingId: string;
  bookingDate: string;
}

export interface TicketData extends BookingData {
  qrCodeDataURL: string;
  trekDate: string;
  reportingTime: string;
  reportingLocation: string;
}

// Generate unique booking reference
export const generateBookingId = (): string => {
  const prefix = 'RT'; // Rapidophilia Trek
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  const random = Math.random().toString(36).substring(2, 5).toUpperCase(); // 3 random chars
  return `${prefix}${timestamp}${random}`;
};

// Generate QR code for ticket verification
export const generateQRCode = async (bookingData: BookingData): Promise<string> => {
  const qrData = {
    bookingId: bookingData.bookingId,
    name: `${bookingData.firstName} ${bookingData.lastName}`,
    trek: bookingData.trekTitle,
    participants: bookingData.participants,
    paymentId: bookingData.paymentId,
    verificationUrl: `${window.location.origin}/verify-booking/${bookingData.bookingId}`
  };

  try {
    const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData), {
      width: 200,
      margin: 2,
      color: {
        dark: '#7C3AED', // Purple color to match brand
        light: '#FFFFFF'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

// Create downloadable ticket HTML
export const generateTicketHTML = (ticketData: TicketData): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trek Ticket - ${ticketData.bookingId}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .ticket {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            position: relative;
        }
        
        .ticket::before {
            content: '';
            position: absolute;
            top: 50%;
            left: -10px;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            transform: translateY(-50%);
        }
        
        .ticket::after {
            content: '';
            position: absolute;
            top: 50%;
            right: -10px;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            transform: translateY(-50%);
        }
        
        .ticket-header {
            background: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .ticket-header h1 {
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .ticket-header p {
            font-size: 16px;
            opacity: 0.9;
        }
        
        .ticket-body {
            padding: 40px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
        }
        
        .booking-details {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .detail-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .detail-row:last-child {
            border-bottom: none;
        }
        
        .detail-label {
            font-weight: 600;
            color: #374151;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .detail-value {
            font-size: 16px;
            color: #111827;
            font-weight: 500;
        }
        
        .qr-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #f9fafb;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
        }
        
        .qr-code {
            margin-bottom: 20px;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .booking-id {
            font-size: 18px;
            font-weight: bold;
            color: #7C3AED;
            margin-bottom: 10px;
            letter-spacing: 1px;
        }
        
        .qr-instruction {
            font-size: 12px;
            color: #6b7280;
            line-height: 1.4;
        }
        
        .important-info {
            background: #fef3c7;
            border: 1px solid #fbbf24;
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
        }
        
        .important-info h3 {
            color: #92400e;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .important-info ul {
            color: #92400e;
            font-size: 14px;
            line-height: 1.6;
            padding-left: 20px;
        }
        
        .contact-info {
            background: #e0f2fe;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            text-align: center;
        }
        
        .contact-info h3 {
            color: #0369a1;
            margin-bottom: 10px;
        }
        
        .contact-info p {
            color: #0369a1;
            font-size: 14px;
            margin: 5px 0;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .ticket::before,
            .ticket::after {
                display: none;
            }
        }
        
        @media (max-width: 768px) {
            .ticket-body {
                grid-template-columns: 1fr;
                gap: 30px;
                padding: 30px 20px;
            }
            
            .ticket-header {
                padding: 20px;
            }
            
            .ticket-header h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="ticket-header">
            <h1>🏔️ RAPIDOPHILIA TREK TICKET</h1>
            <p>Adventure Awaits You!</p>
        </div>
        
        <div class="ticket-body">
            <div class="booking-details">
                <div class="detail-row">
                    <span class="detail-label">Trek Name</span>
                    <span class="detail-value">${ticketData.trekTitle}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Traveler Name</span>
                    <span class="detail-value">${ticketData.firstName} ${ticketData.lastName}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Participants</span>
                    <span class="detail-value">${ticketData.participants} Person${ticketData.participants > 1 ? 's' : ''}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Trek Date</span>
                    <span class="detail-value">${ticketData.trekDate}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Reporting Time</span>
                    <span class="detail-value">${ticketData.reportingTime}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Reporting Location</span>
                    <span class="detail-value">${ticketData.reportingLocation}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Contact</span>
                    <span class="detail-value">${ticketData.phone}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Email</span>
                    <span class="detail-value">${ticketData.email}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Amount Paid</span>
                    <span class="detail-value">₹${ticketData.amount.toLocaleString()}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Payment ID</span>
                    <span class="detail-value">${ticketData.paymentId}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Booking Date</span>
                    <span class="detail-value">${ticketData.bookingDate}</span>
                </div>
            </div>
            
            <div class="qr-section">
                <div class="booking-id">${ticketData.bookingId}</div>
                <img src="${ticketData.qrCodeDataURL}" alt="QR Code" class="qr-code" />
                <p class="qr-instruction">
                    Scan this QR code for quick verification<br>
                    Show this ticket at the reporting location
                </p>
            </div>
        </div>
        
        <div class="important-info">
            <h3>⚠️ Important Instructions</h3>
            <ul>
                <li>Please carry this ticket and a valid ID proof</li>
                <li>Report at the mentioned location 30 minutes before departure</li>
                <li>Carry comfortable trekking shoes and warm clothes</li>
                <li>Follow all safety instructions given by the trek guide</li>
                <li>This ticket is non-transferable and non-refundable</li>
            </ul>
        </div>
        
        <div class="contact-info">
            <h3>📞 Contact Information</h3>
            <p><strong>Phone:</strong> ${CONTACT.phone}</p>
            <p><strong>Email:</strong> ${CONTACT.email}</p>
            <p><strong>Address:</strong> ${CONTACT.address}</p>
            <p>For any queries or support, feel free to contact us!</p>
        </div>
    </div>
</body>
</html>`;
};

// Download ticket as HTML file
export const downloadTicket = (ticketData: TicketData): void => {
  const ticketHTML = generateTicketHTML(ticketData);
  const blob = new Blob([ticketHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
    link.download = `Rapidophilia_Trek_Ticket_${ticketData.bookingId}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Download ticket as a PDF using html2pdf (client-side). Falls back to jsPDF/html2canvas if necessary.
export const downloadTicketPdf = async (ticketData: TicketData): Promise<void> => {
    // Create a container and insert the ticket HTML
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.top = '0';
    container.style.width = '100%';
    container.style.height = 'auto';
    container.style.zIndex = '99999';
    container.style.pointerEvents = 'none';
    container.style.opacity = '0';
    container.innerHTML = generateTicketHTML(ticketData);
    document.body.appendChild(container);

    // wait for images (QR) to load and paint
    await new Promise<void>((resolve) => {
        const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
        if (imgs.length === 0) return resolve();
        let loaded = 0;
        imgs.forEach(img => {
            if (img.complete) {
                loaded++;
                if (loaded === imgs.length) resolve();
            } else {
                img.addEventListener('load', () => {
                    loaded++;
                    if (loaded === imgs.length) resolve();
                });
                img.addEventListener('error', () => {
                    loaded++;
                    if (loaded === imgs.length) resolve();
                });
            }
        });
    });

    // Try dynamic import of html2pdf
    try {
        const html2pdfModule = await import('html2pdf.js');
        // html2pdf default export is a function
        const opt = {
            margin:       [10, 10, 10, 10],
            filename:     `Rapidophilia_Trek_Ticket_${ticketData.bookingId}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'pt', format: 'a4', orientation: 'portrait' }
        } as any;
        // @ts-ignore
        await html2pdfModule.default().from(container).set(opt).save();
    } catch (err) {
        console.warn('html2pdf dynamic import failed, falling back to window.html2pdf or jsPDF method', err);
        // Fallback: try window.html2pdf (if included via CDN)
        // @ts-ignore
        const winHtml2pdf = (window as any).html2pdf;
        if (winHtml2pdf) {
            try {
                // @ts-ignore
                await winHtml2pdf().from(container).save();
            } catch (e) {
                console.error('window.html2pdf error', e);
                // final fallback: generate a PDF via jsPDF + html2canvas
                await fallbackJsPdf(container, ticketData);
            }
        } else {
            await fallbackJsPdf(container, ticketData);
        }
    } finally {
        document.body.removeChild(container);
    }
};

const fallbackJsPdf = async (container: HTMLElement, ticketData: TicketData) => {
    try {
        // dynamic import jsPDF and html2canvas
        const [{ jsPDF }, html2canvas] = await Promise.all([
            import('jspdf'),
            import('html2canvas')
        ]);

        const canvas = await html2canvas.default(container, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
        const pageWidth = pdf.internal.pageSize.getWidth();
        // Fit the canvas to page width
        const imgProps = (pdf as any).getImageProperties(imgData);
        const imgWidth = pageWidth - 40; // 20pt margin each side
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        pdf.addImage(imgData, 'JPEG', 20, 20, imgWidth, imgHeight);
        pdf.save(`Rapidophilia_Trek_Ticket_${ticketData.bookingId}.pdf`);
    } catch (e) {
        console.error('fallbackJsPdf failed', e);
        // as a last resort, fallback to HTML download
        const blob = new Blob([generateTicketHTML(ticketData)], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Rapidophilia_Trek_Ticket_${ticketData.bookingId}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};

// Store booking data in localStorage (simple solution for now)
export const storeBookingData = (bookingData: BookingData): void => {
  const existingBookings = JSON.parse(localStorage.getItem('rapidophilia_bookings') || '[]');
  existingBookings.push(bookingData);
  localStorage.setItem('rapidophilia_bookings', JSON.stringify(existingBookings));
};

// Get booking data by ID
export const getBookingData = (bookingId: string): BookingData | null => {
  const existingBookings = JSON.parse(localStorage.getItem('rapidophilia_bookings') || '[]');
  return existingBookings.find((booking: BookingData) => booking.bookingId === bookingId) || null;
};