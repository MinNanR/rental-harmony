package site.minnan.rental;

import cn.hutool.crypto.SecureUtil;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.hiviewdfx.HiLog;
import ohos.hiviewdfx.HiLogLabel;
import ohos.rpc.*;
import ohos.utils.zson.ZSONObject;
import site.minnan.rental.dto.RequestParam;
import site.minnan.rental.response.Response;

import java.util.HashMap;
import java.util.Map;

public class SecurityAbility extends Ability {
    private static final HiLogLabel LABEL_LOG = new HiLogLabel(3, 0xD001100, "Demo");

    @Override
    public void onStart(Intent intent) {
        HiLog.error(LABEL_LOG, "ServiceAbility::onStart");
        super.onStart(intent);
    }

    @Override
    public void onBackground() {
        super.onBackground();
        HiLog.info(LABEL_LOG, "ServiceAbility::onBackground");
    }

    @Override
    public void onStop() {
        super.onStop();
        HiLog.info(LABEL_LOG, "ServiceAbility::onStop");
    }

    @Override
    public void onCommand(Intent intent, boolean restart, int startId) {
    }

    private MyRemote remote = new MyRemote();


    @Override
    public IRemoteObject onConnect(Intent intent) {
        super.onConnect(intent);
        return remote.asObject();
    }

    @Override
    public void onDisconnect(Intent intent) {
    }

    static class MyRemote extends RemoteObject implements IRemoteBroker {

        private static final int MD5 = 1001;

        private static final String SUCCESS = "000";

        private static final String ERROR = "500";

        public MyRemote(String descriptor) {
            super(descriptor);
        }

        MyRemote() {
            super("MyService_MyRemote");
        }

        @Override
        public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) throws RemoteException {
            Map<String, Object> result = new HashMap<>();
            if (code == MD5) {
                String req = data.readString();
                RequestParam requestParam = ZSONObject.stringToClass(req, RequestParam.class);
                String encodedPassword = SecureUtil.md5(requestParam.getPassword());
                HiLog.info(LABEL_LOG, "password----%{public}s", encodedPassword);
                Response response = Response.success().put("encodedPassword", encodedPassword);
                reply.writeString(response.response());
            } else {
                reply.writeString(Response.invalidOperation().response());
            }
            return true;
        }

        @Override
        public IRemoteObject asObject() {
            return this;
        }
    }
}