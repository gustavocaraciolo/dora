package com.loja.dora.utils;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.loja.dora.security.SecurityUtils;
import com.loja.dora.service.ShopChangeService;
import com.loja.dora.service.dto.ShopChangeDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.ZonedDateTime;

public class CommonUtils {

    private final static Logger log = LoggerFactory.getLogger(CommonUtils.class);

    public static void saveShopChange(ShopChangeService shopChangeService, Long shopId, String entityName, String note, String shopShopName) {
        try {
            log.debug("saving shopchange event : {}", shopShopName);

            ShopChangeDTO shopChangeDTO = new ShopChangeDTO();
            shopChangeDTO.setChange(entityName);
            shopChangeDTO.setChangedEntity(entityName);
            shopChangeDTO.setShopId(shopId);
            shopChangeDTO.setChangeDate(ZonedDateTime.now());
            shopChangeDTO.setNote(note);
            shopChangeDTO.setShopShopName(shopShopName);
            shopChangeDTO.setChangedByFirstName(SecurityUtils.getCurrentUserLogin().get());
            shopChangeService.save(shopChangeDTO);

        } catch (Exception e) {
            log.debug("exception happened in CommonUtils.saveShopChange ", e.getMessage());
        }

    }

    public static void uploadToS3(byte[] fileBytes, String fileName, AmazonS3 amazonS3) {
        InputStream stream = new ByteArrayInputStream(fileBytes);
        try {


            ObjectMetadata meta = new ObjectMetadata();
            meta.setContentLength(fileBytes.length);
            meta.setContentType("image/png");

            amazonS3.putObject(new PutObjectRequest(
                "dora-imagens", fileName, stream, meta)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (Exception e) {

        } finally {
            try {
                stream.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
    }

    public static void deleteFromS3(String fileName, AmazonS3 amazonS3) {
        try {

            amazonS3.deleteObject(new DeleteObjectRequest("dora-imagens", fileName));
        } catch (Exception e) {
            // The call was transmitted successfully, but Amazon S3 couldn't process 
            // it, so it returned an error response.
            e.printStackTrace();
        }

    }


    public static byte[] resize(BufferedImage img, int height, int width) {
        Image tmp = img.getScaledInstance(width, height, Image.SCALE_SMOOTH);
        BufferedImage resized = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g2d = resized.createGraphics();
        g2d.drawImage(tmp, 0, 0, null);
        g2d.dispose();
        return convertBufferedImageToByte(resized);
    }


    public static BufferedImage createImageFromBytes(byte[] imageData) {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        try {
            return ImageIO.read(bais);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static byte[] convertBufferedImageToByte(BufferedImage bufferedImage) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            ImageIO.write(bufferedImage, "png", baos);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        byte[] bytes = baos.toByteArray();
        return bytes;
    }
}


