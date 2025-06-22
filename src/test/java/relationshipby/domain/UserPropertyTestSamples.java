package relationshipby.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class UserPropertyTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static UserProperty getUserPropertySample1() {
        return new UserProperty().id(1L).strValue("strValue1");
    }

    public static UserProperty getUserPropertySample2() {
        return new UserProperty().id(2L).strValue("strValue2");
    }

    public static UserProperty getUserPropertyRandomSampleGenerator() {
        return new UserProperty().id(longCount.incrementAndGet()).strValue(UUID.randomUUID().toString());
    }
}
