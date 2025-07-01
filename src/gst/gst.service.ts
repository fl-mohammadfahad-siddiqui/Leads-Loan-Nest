import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/sequelize';
import { Gst } from './gst.model';

const PAN_SEARCH_URL = 'https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/gstin/api/pan-search';
const GSTIN_DETAILS_URL = 'https://dqw6uizajg.execute-api.ap-south-1.amazonaws.com/mocks/gstin/api/search';

@Injectable()
export class GstService {
  constructor(@InjectModel(Gst) private gstModel: typeof Gst) {}

  async fetchAndSaveGSTData(lead_id: number, pan: string) {
    const panRes = await axios.get(`${PAN_SEARCH_URL}?pan=${pan}`);
    const gstList = panRes.data.list;

    if (!gstList || gstList.length === 0) {
      return { success: false, error: 'No GSTIN found for this PAN', raw: panRes.data };
    }

    const gstDetails: any[] = [];
    for (const gst of gstList) {
      const gstin = gst.gstin;

      try {
        const detailRes = await axios.get(`${GSTIN_DETAILS_URL}?gstin=${gstin}`);
        const detail = detailRes.data;
        gstDetails.push(detail);

        await this.gstModel.create({
          lead_id,
          gstin: detail.gstin,
          taxpayer_name: detail.name,
          tradename: detail.tradename,
          registration_date: detail.registrationDate ? new Date(detail.registrationDate) : null,
          constitution: detail.constitution,
          status: detail.status,
          center: detail.center,
          state: detail.state,
          nature: detail.nature || [],
          address: detail.pradr || {},
          raw_response: detail
        });

      } catch (err) {
        console.error(`Failed fetching details for GSTIN ${gstin}:`, err.message);
      }
    }

    return {
      success: true,
      gstDetails,
      raw: { panSearch: panRes.data, detailResults: gstDetails }
    };
  }
}
