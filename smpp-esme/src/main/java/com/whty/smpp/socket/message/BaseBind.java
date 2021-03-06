package com.whty.smpp.socket.message;

import org.jboss.netty.buffer.ChannelBuffer;

import com.cloudhopper.commons.util.HexUtil;
import com.cloudhopper.commons.util.StringUtil;
import com.whty.smpp.socket.constants.Address;
import com.whty.smpp.socket.constants.SmppConstants;
import com.whty.smpp.socket.exception.NotEnoughDataInBufferException;
import com.whty.smpp.socket.exception.RecoverablePduException;
import com.whty.smpp.socket.exception.UnrecoverablePduException;
import com.whty.smpp.socket.util.ChannelBufferUtil;
import com.whty.smpp.socket.util.PduUtil;
/**
 * 
 * @ClassName BaseBind
 * @author Administrator
 * @date 2017-3-10 下午1:47:38
 * @Description TODO(这里用一句话描述这个类的作用)
 */
public abstract class BaseBind<R extends PduResponse> extends PduRequest<R> {

    private String systemId;
    private String password;
    private String systemType;
    private byte interfaceVersion;
    private Address addressRange;

    public BaseBind(int commandId, String name) {
        super(commandId, name);
    }

    public void setSystemId(String value) {
        this.systemId = value;
    }

    public String getSystemId() {
        return this.systemId;
    }

    public void setPassword(String value) {
        this.password = value;
    }

    public String getPassword() {
        return this.password;
    }

    public void setSystemType(String value) {
        this.systemType = value;
    }

    public String getSystemType() {
        return this.systemType;
    }

    public void setInterfaceVersion(byte value) {
        this.interfaceVersion = value;
    }

    public byte getInterfaceVersion() {
        return this.interfaceVersion;
    }

    public Address getAddressRange() {
        return this.addressRange;
    }

    public void setAddressRange(Address value) {
        this.addressRange = value;
    }

    @Override
    public void readBody(ChannelBuffer buffer) throws UnrecoverablePduException, RecoverablePduException {
        this.systemId = ChannelBufferUtil.readNullTerminatedString(buffer);
        this.password = ChannelBufferUtil.readNullTerminatedString(buffer);
        this.systemType = ChannelBufferUtil.readNullTerminatedString(buffer);
        // at this point, we should have at least 3 bytes left
        if (buffer.readableBytes() < 3) {
            throw new NotEnoughDataInBufferException("After parsing systemId, password, and systemType", buffer.readableBytes(), 3);
        }
        this.interfaceVersion = buffer.readByte();
        this.addressRange = ChannelBufferUtil.readAddress(buffer);
    }
    
    @Override
    public int calculateByteSizeOfBody() {
        int bodyLength = 0;
        bodyLength += PduUtil.calculateByteSizeOfNullTerminatedString(this.systemId);
        bodyLength += PduUtil.calculateByteSizeOfNullTerminatedString(this.password);
        bodyLength += PduUtil.calculateByteSizeOfNullTerminatedString(this.systemType);
        bodyLength += 1; // interface version
        bodyLength += PduUtil.calculateByteSizeOfAddress(this.addressRange);
        return bodyLength;
    }

    @Override
    public void writeBody(ChannelBuffer buffer) throws UnrecoverablePduException, RecoverablePduException {
        ChannelBufferUtil.writeNullTerminatedString(buffer, this.systemId);
        ChannelBufferUtil.writeNullTerminatedString(buffer, this.password);
        ChannelBufferUtil.writeNullTerminatedString(buffer, this.systemType);
        buffer.writeByte(this.interfaceVersion);
        ChannelBufferUtil.writeAddress(buffer, this.addressRange);
    }

    @Override
    public void appendBodyToString(StringBuilder buffer) {
        buffer.append("systemId [");
        buffer.append(StringUtil.toStringWithNullAsEmpty(this.systemId));
        buffer.append("] password [");
        buffer.append(StringUtil.toStringWithNullAsEmpty(this.password));
        buffer.append("] systemType [");
        buffer.append(StringUtil.toStringWithNullAsEmpty(this.systemType));
        buffer.append("] interfaceVersion [0x");
        buffer.append(HexUtil.toHexString(this.interfaceVersion));
        buffer.append("] addressRange (");
        if (this.addressRange == null) {
            buffer.append(SmppConstants.EMPTY_ADDRESS.toString());
        } else {
            buffer.append(StringUtil.toStringWithNullAsEmpty(this.addressRange));
        }
        buffer.append(")");
    }
}