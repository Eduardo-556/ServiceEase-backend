import { Request, Response } from "express";
import { ServiceImgService } from "../services/serviceImg";

export const serviceImg = {
  // POST /service/:id/img
  create: async (req: Request, res: Response) => {
    const serviceId = req.params.id;
    const imgUrl = req.body.imgUrl;
    console.log(serviceId);
    console.log(imgUrl);
    try {
      const newServiceImg = await ServiceImgService.createServiceImg(
        Number(serviceId),
        imgUrl
      );
      return res.status(200).json(newServiceImg);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },

  //GET /service/:id/img
  search: async (req: Request, res: Response) => {
    const serviceId = req.params.id;
    try {
      const serviceImgs = await ServiceImgService.searchServiceImg(
        Number(serviceId)
      );
      return res.status(200).json(serviceImgs);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
  //DELETE /service/:id/img
  delete: async (req: Request, res: Response) => {
    const serviceId = req.params.id;
    const serviceImgId = req.body.id;
    const imgDelete = await ServiceImgService.findById(serviceImgId);
    const serviceIdFromImg = imgDelete!.serviceId;
    try {
      if (Number(serviceId) !== serviceIdFromImg) {
        return res.status(400).json({ message: "You are not authorized" });
      }
      if (!imgDelete) {
        return res.status(400).json({ message: "Image not found" });
      }
      await ServiceImgService.deleteServiceImg(Number(imgDelete.id));

      return res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  },
};
