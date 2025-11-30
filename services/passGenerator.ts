import JSZip from 'jszip';
import saveAs from 'file-saver';
import { PassData, PassType } from '../types';

export const generatePassPackage = async (data: PassData) => {
  const zip = new JSZip();

  if (data.type === PassType.APPLE) {
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: "pass.com.example.passbook",
      serialNumber: Date.now().toString(),
      teamIdentifier: "MXL...",
      organizationName: data.organizationName,
      description: data.description,
      logoText: data.logoText,
      foregroundColor: `rgb(${hexToRgb(data.foregroundColor)})`,
      backgroundColor: `rgb(${hexToRgb(data.backgroundColor)})`,
      labelColor: `rgb(${hexToRgb(data.labelColor)})`,
      barcode: {
        message: data.barcodeValue,
        format: data.barcodeFormat,
        messageEncoding: "iso-8859-1"
      },
      storeCard: {
        primaryFields: [
          {
            key: "balance",
            label: data.fields[0].label,
            value: data.fields[0].value
          }
        ],
        secondaryFields: [
          {
            key: "level",
            label: data.fields[1].label,
            value: data.fields[1].value
          }
        ]
      }
    };

    zip.file("pass.json", JSON.stringify(passJson, null, 2));
    zip.file("manifest.json", JSON.stringify({ version: "1.0" }, null, 2));
    zip.file("signature", "PLACEHOLDER_SIGNATURE_BINARY");
    
    if (data.logoImage) {
        const base64Data = data.logoImage.split(',')[1];
        zip.file("logo.png", base64Data, { base64: true });
        zip.file("logo@2x.png", base64Data, { base64: true });
    }

    if (data.backgroundImage) {
        const base64Data = data.backgroundImage.split(',')[1];
        zip.file("strip.png", base64Data, { base64: true });
        zip.file("strip@2x.png", base64Data, { base64: true });
    }

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "pass.pkpass.zip");

  } else {
    const googleJson = {
      kind: "walletobjects#loyaltyObject",
      id: "loyalty_object_1",
      classId: "loyalty_class_1",
      state: "active",
      barcode: {
        type: data.barcodeFormat === 'PKBarcodeFormatQR' ? "qrCode" : "pdf417",
        value: data.barcodeValue
      },
      accountName: data.fields[0].value,
      accountId: data.barcodeValue,
      loyaltyPoints: {
        balance: {
          string: data.fields[1].value
        },
        label: data.fields[1].label
      },
      textModulesData: [
        {
          header: "Organization",
          body: data.organizationName
        },
        {
          header: "Description",
          body: data.description
        }
      ]
    };

    const blob = new Blob([JSON.stringify(googleJson, null, 2)], { type: "application/json" });
    saveAs(blob, "google-pay-pass.json");
  }
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0, 0, 0";
};