package site.minnan.rental.response;

public enum ResponseCode {

    SUCCESS("000", "成功"),

    FAIL("001", "失败"),

    INVALID_OPERATION("005", "无法识别的操作");


    private final String code;

    private final String message;

    ResponseCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String code() {
        return code;
    }

    public String message() {
        return message;
    }
}
