package site.minnan.rental.response;

import ohos.utils.zson.ZSONObject;

import java.io.Serializable;
import java.util.HashMap;

/**
 * 返回消息
 *
 * @author Minnan on 2021/06/17
 */
public class Response extends HashMap<String, Object> implements Serializable {

    private Response() {
        super();
    }

    public static Response success() {
        Response response = new Response();
        ResponseCode code = ResponseCode.SUCCESS;
        response.put("code", code.code());
        response.put("message", code.message());
        return response;
    }

    public static Response fail() {
        Response response = new Response();
        ResponseCode code = ResponseCode.FAIL;
        response.put("code", code.code());
        response.put("message", code.message());
        return response;
    }

    public static Response invalidOperation() {
        Response response = new Response();
        ResponseCode code = ResponseCode.INVALID_OPERATION;
        response.put("code", code.code());
        response.put("message", code.message());
        return response;
    }

    public Response put(String key, Object value) {
        super.put(key, value);
        return this;
    }

    public String response(){
        return ZSONObject.toZSONString(this);
    }

}
