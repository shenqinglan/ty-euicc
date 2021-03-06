package com.whty.smpp.socket.message;

import com.whty.smpp.socket.constants.SmppConstants;
/**
 * 
 * @ClassName BindReceiver
 * @author Administrator
 * @date 2017-3-10 下午1:47:21
 * @Description TODO(这里用一句话描述这个类的作用)
 */
public class BindReceiver extends BaseBind<BindReceiverResp> {

    public BindReceiver() {
        super(SmppConstants.CMD_ID_BIND_RECEIVER, "bind_receiver");
    }

    @Override
    public BindReceiverResp createResponse() {
        BindReceiverResp resp = new BindReceiverResp();
        resp.setSequenceNumber(this.getSequenceNumber());
        return resp;
    }

    @Override
    public Class<BindReceiverResp> getResponseClass() {
        return BindReceiverResp.class;
    }
    
}