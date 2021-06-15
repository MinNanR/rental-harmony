package site.minnan.rental;

import cn.hutool.core.util.CharsetUtil;
import cn.hutool.crypto.SecureUtil;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.app.Context;
import ohos.rpc.*;
import ohos.utils.zson.ZSONObject;

import java.util.HashMap;
import java.util.Map;

public class SecurityAbility extends Ability {

    private static final String BUNDLE_NAME = "site.minnan.rental.SecurityAbility";

    private static final String ABILITY_NAME = "SecurityAbility";

    private SecurityRemote remote;

    @Override
    protected void onStart(Intent intent) {
        super.onStart(intent);
    }

    @Override
    protected IRemoteObject onConnect(Intent intent) {
        super.onConnect(intent);
        Context context = getContext();
        remote = new SecurityRemote();
        return remote.asObject();
    }

    class SecurityRemote extends RemoteObject implements IRemoteObject{
        public SecurityRemote() {
            super("SecurityRemote");
        }

        @Override
        public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) throws RemoteException {
            String param = data.readString();
            String encodePassword = SecureUtil.md5().digest(param, CharsetUtil.UTF_8).toString();
            reply.writeString(encodePassword);
            return true;
        }

        public IRemoteObject asObject(){
            return this;
        }
    }
}
