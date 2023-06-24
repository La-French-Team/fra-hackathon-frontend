import { typeToResourceType } from "./constants"


class LoService {
  getUriFromSDLObject(object) {
    return `https://api.onerecord.fr/sdl/tenants/geodis/${typeToResourceType[object.type]}/${object?.params?.id}`
  }

  getUriFromNeOneObject (object) {
    return object['@id'];
  }

  getUri(object) {
    if (object?.params?.id) {
      return this.getUriFromSDLObject(object)
    }
    return this.getUriFromNeOneObject(object)
  }

}

export default new LoService()