package site.minnan.rental.validate;

/**
 * 参数校验规则
 *
 * @author Minnan on 2021/06/19
 */
public class ValidateRule {

    private String notNull;

    private String notBlank;

    public String getNotNull() {
        return notNull;
    }

    public void setNotNull(String notNull) {
        this.notNull = notNull;
    }

    public String getNotBlank() {
        return notBlank;
    }

    public void setNotBlank(String notBlank) {
        this.notBlank = notBlank;
    }
}
