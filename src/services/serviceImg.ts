import { ServiceImg } from "../models/ServiceImg";

export const ServiceImgService = {
  createServiceImg: async (serviceId: number, url: string) => {
    const newServiceImg = await ServiceImg.create({
      serviceId: serviceId,
      imgUrl: url,
    });
    return newServiceImg;
  },

  deleteServiceImg: async (serviceImgId: number) => {
    const imgId = await ServiceImg.findByPk(serviceImgId);
    const deleteServiceImg = await imgId!.destroy();
    return deleteServiceImg;
  },

  searchServiceImg: async (serviceId: number) => {
    const serviceImgs = await ServiceImg.findAll({ where: { serviceId } });
    return serviceImgs;
  },

  findById: async (imgId: number) => {
    const serviceImg = await ServiceImg.findByPk(imgId);
    return serviceImg;
  },
};
