
import { ResourceOptions } from "adminjs";

const userResourceOptions: ResourceOptions = {
  navigation: "Administração",
  properties: {
    birth: {
      type: "date",
    },
    language: {
      availableValues: [
        { value: "pt-BR", label: "Portuguese" },
        { value: "en-US", label: "English" },
      ],
    },
    password: {
      type: "password",
    },
    role: {
      availableValues: [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuário" },
      ],
    },
    subscriptionStatus: {
      availableValues: [
        { value: "active", label: "Ativo" },
        { value: "inactive", label: "Inativo" },
      ],
    },
    subscriptionPlan: {
      availableValues: [
        { value: "basic", label: "Básico" },
        { value: "premium", label: "Premium" },
      ],
    },
  },
  editProperties: [
    "firstName",
    "lastName",
    "birth",
    "email",
    "phone",
    "password",
    "role",
    "language",
    "subscriptionStatus",
    "subscriptionPlan",
  ],

  filterProperties: [
    "firstName",
    "lastName",
    "birth",
    "email",
    "phone",
    "role",
    "language",
    "subscriptionStatus",
    "subscriptionPlan",
    "createdAt",
    "updatedAt",
  ],

  listProperties: [
    "id",
    "firstName",
    "lastName",
    "role",
    "language",
    "subscriptionStatus",
    "subscriptionPlan",
  ],

  showProperties: [
    "id",
    "firstName",
    "lastName",
    "birth",
    "email",
    "phone",
    "role",
    "language",
    "subscriptionStatus",
    "subscriptionPlan",
    "createdAt",
    "updatedAt",
  ],
};

export { userResourceOptions };

