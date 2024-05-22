import asyncHandler from "express-async-handler";
import { catchErr } from "../configuration/config.js";
import { AmazonProduct, Store } from "../model/index.js";

/*
export const getStore = asyncHandler(async (req, res) => {
  const { page } = req.params;
  const limit = 7;

  try {
    const totalItems = await Store.countDocuments();
    const totalPage = Math.ceil(totalItems / limit);

    const my_data = await Store.aggregate([
      {
        $lookup: {
          from: "amazonproducts",
          localField: "_id",
          foreignField: "store",
          as: "products",
        },
      },
    ])
      .skip((page - 1) * limit)
      .limit(limit);
    const data = await Store.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const updatedData = {
      ...data,
      my_data,
    };
    res.status(200).json({
      data: my_data,
      totalPage,
      status: 200,
      message: "Found Data",
      currentPageNum: Number(page),
    });
  } catch (error) {
    res.status(200).json({
      error,
      status: 500,
      message: catchErr("getSetting", "Setting"),
    });
  }
});
 */

/*
export const getSingleStore = asyncHandler(async (req, res) => {
  const { page, id } = req.params;
  const limit = 7;
  const pageNumber = parseInt(page, 10) || 1;

  try {
    const totalItems = await Store.countDocuments();
    const totalPage = Math.ceil(totalItems / limit);

    if (pageNumber < 1 || pageNumber > totalPage) {
      return res.status(400).json({
        status: 400,
        message: "Invalid page number",
      });
    }

    const my_data = await Store.aggregate([
      {
        $lookup: {
          from: "amazonproducts",
          localField: "_id",
          foreignField: "store",
          as: "products",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$products" },
        },
      },
      { $skip: (pageNumber - 1) * limit },
      { $limit: limit },
    ]);

    res.status(200).json({
      data: my_data,
      totalPage,
      status: 200,
      message: "Found Data",
      currentPageNum: pageNumber,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: 500,
      message: "An error occurred while fetching data",
    });
  }
});
*/

/*
export const getSingleStore = asyncHandler(async (req, res) => {
  const {page, id } = req.params;
    const limit = 7;
    const pageNumber = parseInt(page, 10) || 1;
  try {
    const data = await Store.findById(id);
    if (!data) {
      return res
        .status(200)
        .json({ data, status: 200, message: "No data found" });
    } else {
      return res
        .status(200)
        .json({ data, status: 200, message: `Found data with ${id}` });
    }
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("getSingleStore", "Store"),
    });
  }
});
*/

export const getSingleStore = asyncHandler(async (req, res) => {
  const { page, id } = req.params;
  const limit = 7;
  const pageNumber = parseInt(page, 10) || 1;

  try {
    const store = await Store.findById(id);
    if (!store) {
      return res.status(200).json({
        status: 400,
        message: "Store not found",
      });
    }

    const totalItems = await AmazonProduct.countDocuments({ store: id });
    const totalPage = Math.ceil(totalItems / limit);

    if (pageNumber < 1 || pageNumber > totalPage) {
      return res.status(200).json({
        status: 400,
        message: "Invalid page number",
      });
    }

    const my_data = await Store.aggregate([
      { $match: { _id: store._id } },
      {
        $lookup: {
          from: "amazonproducts",
          localField: "_id",
          foreignField: "store",
          as: "products",
        },
      },
      {
        $addFields: {
          productCount: { $size: "$products" },
          products: { $slice: ["$products", (pageNumber - 1) * limit, limit] },
        },
      },
    ]);

    res.status(200).json({
      totalPage,
      totalItems,
      status: 200,
      data: my_data[0],
      message: "Found Data",
      currentPageNum: pageNumber,
    });
  } catch (error) {
    res.status(200).json({
      error: error.message,
      status: 500,
      message: "An error occurred while fetching data",
    });
  }
});

export const getStore = asyncHandler(async (req, res) => {
  const { page } = req.params;
  const limit = 7;
  const pageNumber = parseInt(page, 10) || 1;

  try {
    const totalItems = await Store.countDocuments();
    const totalPage = Math.ceil(totalItems / limit);

    if (pageNumber < 1 || pageNumber > totalPage) {
      return res.status(200).json({
        status: 400,
        message: "Invalid page number",
      });
    }

    const data = await Store.aggregate([
      {
        $lookup: {
          from: "amazonproducts",
          localField: "_id",
          foreignField: "store",
          as: "products",
        },
      },
      {
        $project: {
          storeName: 1,
          createdAt: 1,
          updatedAt: 1,
          productCount: { $size: "$products" },
        },
      },
      { $skip: (pageNumber - 1) * limit },
      { $limit: limit },
    ]);

    res.status(200).json({
      data,
      totalPage,
      status: 200,
      message: "Found Data",
      currentPageNum: pageNumber,
    });
  } catch (error) {
    res.status(200).json({
      status: 500,
      error: error.message,
      message: catchErr("getStore", "Store"),
    });
  }
});

export const searchStore = asyncHandler(async (req, res) => {
  const { value } = req.body;
  try {
    if (!value) {
      return res.status(200).json({
        status: 400,
        message: "Value not found in searchStore",
      });
    }

    const data = await Store.aggregate([
      {
        $match: {
          storeName: { $regex: value, $options: "i" },
        },
      },
      {
        $lookup: {
          from: "amazonproducts",
          localField: "_id",
          foreignField: "store",
          as: "products",
        },
      },
      {
        $project: {
          storeName: 1,
          createdAt: 1,
          updatedAt: 1,
          productCount: { $size: "$products" },
        },
      },
    ]);

    res.status(200).json({ data, status: 200, message: "Found Data" });
  } catch (error) {
    res.status(200).json({
      status: 500,
      error: error.message,
      message: catchErr("searchStore", "Store"),
    });
  }
});

export const searchStoreProduct = asyncHandler(async (req, res) => {
  const { value } = req.body;
  try {
    if (!value) {
      return res.status(200).json({
        status: 400,
        message: "Value not found in searchStoreProduct",
      });
    }

    const data = await Store.aggregate([
      {
        $lookup: {
          from: "amazonproducts",
          localField: "_id",
          foreignField: "store",
          as: "products",
        },
      },
      { $unwind: "$products" },
      {
        $match: {
          "products.title": { $regex: value, $options: "i" },
        },
      },
      {
        $group: {
          _id: "$_id",
          storeName: { $first: "$storeName" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          products: { $push: "$products" },
        },
      },
      {
        $addFields: {
          productCount: { $size: "$products" },
        },
      },
    ]);

    res.status(200).json({
      data,
      status: 200,
      message: "Found Data",
    });
  } catch (error) {
    res.status(200).json({
      status: 500,
      error: error.message,
      message: catchErr("searchStoreProduct", "Store"),
    });
  }
});

export const addStore = async (req, res) => {
  const product = {
    counter: 22,
    title: "check Search",
    price: "19",
    product_url:
      "https://www.amazon.com/Amazon-Essentials-Slim-fit-Quick-Dry-Shirt-DNU/…",
    description:
      "We listen to customer feedback and fine-tune every detail to ensure ou…",
    inShopify: false,
    shopifyId: null,
    store: "663e06055acd88c4fcdf1009",
  };

  try {
    const data = await AmazonProduct.create(product);
    return res.status(200).json({
      data,
      status: 200,
      message: "store Added",
    });
  } catch (error) {
    return res.status(200).json({
      error,
      status: 500,
      message: catchErr("addStore", "Store"),
    });
  }
};
